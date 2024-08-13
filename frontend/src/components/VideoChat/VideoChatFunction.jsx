import React, { useState, useEffect, useRef, useCallback } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import UserVideoComponent from "./UserVideoComponent";
import useUserStore from "../../store/userStore";
import { PhoneXMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const OPENVIDU_SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS;

const VideoChatFunction = ({ channelId, mode, setMode }) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const [myUserName, setMyUserName] = useState(userInfo?.nickName);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  const OV = useRef(null);

  useEffect(() => {
    return () => {
      if (session) {
        leaveSession();
      }
    };
  }, [session]);

  useEffect(() => {
    if (userInfo) {
      setMyUserName(userInfo.nickName);
      joinSession();
    }
  }, [userInfo]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub !== streamManager)
    );
  }, []);

  const getToken = useCallback(async () => {
    const sessionId = await createSession(channelId);
    return createToken(sessionId);
  }, [channelId]);

  const createSession = async (channelId) => {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/session`,
      { customSessionId: channelId }
    );
    return response.data.data;
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/token`,
      { session: sessionId }
    );
    return response.data.data;
  };

  const joinSession = useCallback(async () => {
    OV.current = new OpenVidu();

    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);

    try {
      const token = await getToken();
      await mySession.connect(token, { clientData: myUserName });

      let publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      mySession.publish(publisher);

      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const currentVideoDeviceId = publisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId
      );

      setCurrentVideoDevice(currentVideoDevice);
      setMainStreamManager(publisher);
      setPublisher(publisher);
    } catch (error) {
      console.log(
        "Error connecting to the session:",
        error.code,
        error.message
      );
    }
  }, [myUserName, getToken, deleteSubscriber]);

  const leaveSession = useCallback(() => {
    if (session) {
      session?.disconnect();
      setSession(undefined);
    }

    OV.current = null;
    setSubscribers([]);
    setMyUserName(userInfo?.nickName);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session, userInfo]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await session.unpublish(mainStreamManager);
          await session.publish(newPublisher);

          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [session, mainStreamManager, currentVideoDevice]);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session" className="bg-black">
          <div id="video-container" className="col-lg-12 p-1">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6 relative group"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-md inline-flex items-center"
                    onClick={() => {
                      leaveSession();
                      setMode(!mode);
                    }}
                    id="buttonLeaveSession"
                  >
                    <PhoneXMarkIcon className="h-5 w-5 mr-2" />
                    통화 종료
                  </button>
                </div>
              </div>
            ) : null}
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default VideoChatFunction;
