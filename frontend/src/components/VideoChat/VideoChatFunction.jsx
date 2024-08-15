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
    <div className="h-full bg-black flex flex-col">
      {session !== undefined ? (
        <div id="session" className="h-full flex-grow overflow-y-auto p-2">
          <div
            id="video-container"
            className="flex flex-wrap gap-2 justify-center"
          >
            {publisher !== undefined && (
              <div
                className="stream-container flex-1 bg-black relative group"
                onClick={() => handleMainVideoStream(publisher)}
                style={{ maxWidth: "600px" }}
              >
                <UserVideoComponent
                  streamManager={publisher}
                  isPublisher={true}
                  leaveSession={() => {
                    leaveSession();
                    setMode(!mode);
                  }}
                />
              </div>
            )}
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                className="stream-container flex-1 bg-black relative group"
                onClick={() => handleMainVideoStream(sub)}
                style={{ maxWidth: "600px" }}
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
