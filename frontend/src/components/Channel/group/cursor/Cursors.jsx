import { React, useRef, useState, useEffect, forwardRef, useImperativeHandle} from "react";
import ReactDOMServer from 'react-dom/server'
import throttle from "lodash.throttle";
import { Stomp } from "@stomp/stompjs";
import { MyCursor } from "./MyCursor";


const Cursors = forwardRef((props, ref) => {
  const channelId = props.channelId;
  const map = props.map;
  const [users, setUsers] = useState({});
  const socketUrl = process.env.REACT_APP_//CURSOR_WEBSOCKET_ADDRESS;
  const [isConnected, setIsConnected] = useState(false);
  const [nickName, setNickName] = useState("");
  const stompClient = useRef(null);
  const cursorMarkers = useRef({});

  const getUserNickName = () => {
    const userObjectString = localStorage.getItem("userStorage");
    const userObject = JSON.parse(userObjectString);
    setNickName(userObject.state.userInfo.nickName);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useImperativeHandle(ref, () => ({
    getCursorMarkers: () => cursorMarkers.current, // 외부에서 cursorMarkers에 접근할 수 있도록 메서드 제공
  }));

  useEffect(() => {
    const clearCursors = () => {
      Object.keys(cursorMarkers.current).forEach((key) => {
        cursorMarkers.current[key].setMap(null);
      });
      cursorMarkers.current = {};;
      setUsers({});
    }

    return () => {
      clearCursors();
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    }
  }, [channelId])

  useEffect(() => {

    getUserNickName();

    const socket = new WebSocket(socketUrl);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      () => {
        setIsConnected(true)
        stompClient.current.subscribe(
          `/sub/cursorroom/${channelId}`,
          (message) => {
            const cursorData = JSON.parse(message.body);
            setUsers(prevUsers => ({
              ...prevUsers,
              [cursorData.nickName]: cursorData
            }));
          });
      },
      (error) => { }
    );

    const handlePointerMove = throttle((mouseEvent) => {
      if (isConnected && nickName && map) {
        const latlng = mouseEvent.latLng;
        // const latlng = map.getProjection().coordsFromContainerPoint(new window.kakao.maps.Point(e.clientX, e.clientY));
        console.log("나의 위치 !!!! 위도: " + latlng.getLat() + " 경도: " + latlng.getLng());
        const cursorPosition = { channelId, nickName, x: latlng.getLat(), y: latlng.getLng() };
        stompClient.current.send(
          `/pub/position`,
          { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
          JSON.stringify(cursorPosition));
      }
    });

    // window.addEventListener('mousemove', handlePointerMove);

    // 신의 한 수
    window.kakao.maps.event.addListener(map, 'mousemove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      stompClient.current.disconnect();
    };
  }, [nickName, socketUrl, channelId, isConnected, map]);
  
  useEffect(() => {
    const updateCursorPositions = () => {

      if (map && users) {
        Object.keys(users).forEach((key) => {
          if (key === nickName) return;
  
          const { x, y } = users[key];
          const position = new window.kakao.maps.LatLng(x, y);
          console.log("상대 커서 위치 !!! position: " + position)
  
          // 기존 마커가 없으면 새로 생성
          if (!cursorMarkers.current[key]) {
            const randomColor = getRandomColor();
            const content = ReactDOMServer.renderToString(<MyCursor color={randomColor} nickName={key} />);
            const marker = new window.kakao.maps.CustomOverlay({
              position,
              content,
              xAnchor: 0.5,
              yAnchor: 0.5,
              map,
            });
            cursorMarkers.current[key] = marker;
          } else {
          cursorMarkers.current[key].setMap(null);  // 기존 마커 제거
          cursorMarkers.current[key].setPosition(position);  // 위치 업데이트
          cursorMarkers.current[key].setMap(map);  // 다시 지도에 추가
          }
        });
      }
    }

    updateCursorPositions();

    // 줌 레벨 변경 시 상대방 커서 위치를 업데이트하는 이벤트 리스너 추가
    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      updateCursorPositions();
    });
  }, [users, map, nickName]);

  return (
    <>
    </>
  );
});

export default Cursors;