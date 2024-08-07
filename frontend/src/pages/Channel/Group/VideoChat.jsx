import React, { useState, useRef, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import useUserStore from "../../../store/userStore";

const OPENVIDU_SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS;



const VideoChat = () => {
  
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const localVideoRef = useRef();
  
  const userInfo = useUserStore((state) => state.userInfo);
  const userNickName = userInfo?.nickName;



  useEffect(() => {
    return () => {
      if (session) session.disconnect();
    };
  }, [session]);

    // 세션에 연결하는 함수
  const joinSession = async () => {
    const OV = new OpenVidu();
    const mySession = OV.initSession();


      // 스트림 생성 시 구독자 추가 이벤트 핸들러 설정
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    // 스트림이 제거될 때 구독자를 제거하는 이벤트 핸들러 설정
    mySession.on("streamDestroyed", (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (subscriber) => subscriber !== event.stream.streamManager
        )
      );
    });

    setSession(mySession);

    try {
      const token = await getToken();
      await mySession.connect(token, { clientData: userNickName });

      const publisher = OV.initPublisher(localVideoRef.current, {
        audioSource: undefined, // 마이크를 기본값으로 사용
        videoSource: undefined, // 카메라를 기본값으로 사용
        publishAudio: true, // 오디오 전송 여부
        publishVideo: true, // 비디오 전송 여부
        resolution: "640x480", // 해상도
        frameRate: 30, // 프레임 레이트
        insertMode: "APPEND", // 비디오 삽입 모드
      });

      mySession.publish(publisher);
      setPublisher(publisher);

      // 퍼블리셔 초기화 로그 출력
      console.log("Publisher initialized", publisher);
    } catch (error) {
      console.error("Error connecting to the session:", error);
    }
  };

  // DB 에서 모임채널의 세션 ID를 가져와 화상채팅을 위한 TOKEN 생성
  const getToken = async () => {
    const channelId = "1"; // <-- 나중에 현재 모임채널의 아이디로 수정
    const sessionId = await getSessionId(channelId);
    
    let token = await createToken(sessionId);
    return token;
  };

  // 채널 ID로 채널정보를 가져와서 세션 ID를 파싱하면될듯?? 
  const getSessionId = async (channelId) => {
    const response = await axios.get(
      `${OPENVIDU_SERVER_URL}/channel/detail/${channelId}`);// 예시 URL, 실제 API 경로에 맞게 수정 필요            
    console.log(response.data.data.channelSessionId)
    return response.data.data.channelSessionId; // 응답 데이터에서 세션 ID 반환
  };


 // join session할떄마다 만들어버립시다.
  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/token`,{session:sessionId});
    return response.data.data; // data.token -> data.data로 수정
  };

  return (
    <div>
      <h1>OpenVidu React App</h1>
      <button onClick={joinSession}>Join Session</button>
      <div id="video-container">
        <div className="video-box" ref={localVideoRef}></div>
        {subscribers.map((subscriber, index) => (
          <div key={index} className="video-box">
            <div ref={(element) => subscriber.addVideoElement(element)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoChat;
