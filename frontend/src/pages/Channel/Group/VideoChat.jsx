import React, { useState, useRef, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const OPENVIDU_SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS;
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const VideoChat = () => {
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const localVideoRef = useRef();

  useEffect(() => {
    return () => {
      if (session) session.disconnect();
    };
  }, [session]);

  const joinSession = async () => {
    const OV = new OpenVidu();
    const mySession = OV.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    setSession(mySession);

    try {
      const token = await getToken();
      await mySession.connect(token, { clientData: "User" });

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

      // publisher 변수를 사용하여 경고 해결
      console.log("Publisher initialized", publisher);
    } catch (error) {
      console.error("Error connecting to the session:", error);
    }
  };

  const getToken = async () => {
    const sessionId = await createSession();
    return createToken(sessionId);
  };

  const createSession = async () => {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/session`,
      { customSessionId: "SessionA" },
      { auth: { username: "OPENVIDUAPP", password: OPENVIDU_SERVER_SECRET } }
    );
    return response.data.data; // data.sessionId -> data.data로 수정
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/token`,
      { session: sessionId },
      { auth: { username: "OPENVIDUAPP", password: OPENVIDU_SERVER_SECRET } }
    );
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
