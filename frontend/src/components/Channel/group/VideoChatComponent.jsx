import React, { useEffect, useRef, useState } from "react";

const VideoChatComponent = ({ channelId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 비디오 스트림 시작
    startLocalStream();

    // 컴포넌트가 언마운트될 때 정리
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const createPeerConnection = () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // 실제 구현에서는 여기서 시그널링 서버로 ICE candidate를 전송합니다.
        console.log("New ICE candidate:", event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // 로컬 스트림을 peer connection에 추가
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localVideoRef.current.srcObject);
      });
    }

    peerConnectionRef.current = peerConnection;
  };

  const startCall = async () => {
    createPeerConnection();
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    setIsCalling(true);

    // 실제 구현에서는 여기서 시그널링 서버로 offer를 전송합니다.
    console.log("Offer created:", offer);
  };

  const answerCall = async () => {
    createPeerConnection();
    // 실제 구현에서는 여기서 시그널링 서버로부터 받은 offer를 사용합니다.
    const dummyOffer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setRemoteDescription(dummyOffer);

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);

    // 실제 구현에서는 여기서 시그널링 서버로 answer를 전송합니다.
    console.log("Answer created:", answer);
    setIsCalling(true);
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setIsCalling(false);
  };

  return (
    <div className="video-chat-container">
      <div className="video-container">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="local-video"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="remote-video"
        />
      </div>
      <div className="controls">
        {!isCalling ? (
          <>
            <button onClick={startCall} className="call-button">
              통화 시작
            </button>
            <button onClick={answerCall} className="answer-button">
              통화 응답
            </button>
          </>
        ) : (
          <button onClick={endCall} className="end-call-button">
            통화 종료
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoChatComponent;
