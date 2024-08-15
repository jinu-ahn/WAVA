import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import fetchChat from "../../api/chatApi";
import MyMessageComponent from "./message/MyMessageComponent";
import OtherMessageComponent from "./message/OtherMessageComponent";
import ChatInputComponent from "./ChatInputComponent";
// zustand
import useUserStore from "../../store/userStore";
// axios 추가
import { Stomp } from "@stomp/stompjs";
import MessageDateComponent from "./message/MessageDateComponent";

function ChatComponent(props) {
  // URL에서 채팅방 ID를 가져옴
  // const { channelId } = useParams();
  const channelId = props.channelId;
  // 채팅 메시지 상태
  const [messages, setMessages] = useState([]);
  // 메시지 입력 상태
  const [inputValue, setInputValue] = useState("");
  const [nickName, setNickName] = useState("");
  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);
  // 채팅 메시지 목록의 끝을 참조하는 ref. 이를 이용해 새 메시지가 추가될 때 스크롤을 이동
  const messagesEndRef = useRef(null);
  // 컴포넌트 마운트 시 실행. 웹소켓 연결 및 초기 메시지 로딩
  const [profileImg, setProfileImg] = useState(null);
  const [customerSeq, setCustomerSeq] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getUserNickName = () => {
    const userObjectString = sessionStorage.getItem("userStorage");
    const userObject = JSON.parse(userObjectString);
    setNickName(userObject.state.userInfo.nickName);
  };

  const stringToDate = (str) => {
    const [year, month, day] = str.split(".");
    return new Date(year, month - 1, day);
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isChangeDate = (prevMessage, currentMessage) => {
    const prevDate = prevMessage
      ? stringToDate(prevMessage.registTime.substring(0, 10))
      : null;
    const currentDate = stringToDate(
      currentMessage.registTime.substring(0, 10)
    );
    return !isSameDate(prevDate, currentDate);
  };

  useEffect(() => {
    connect();
    fetchMessages();
    getUserNickName();
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, [channelId]);

  // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_ADDRESS);
    stompClient.current = Stomp.over(socket);
    // console.log(sessionStorage.getItem("accessToken"));
    stompClient.current.connect(
      { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      () => {
        stompClient.current.subscribe(
          `/sub/chatroom/${channelId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          },
          { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` }
        );
      },
      (error) => {}
    );
    // console.log("방 번호", channelId);
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
    setNickName("");
  };

  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = () => {
    fetchChat(
      channelId,
      (response) => {
        // console.log("response", response);
        // console.log("메시지 목록", response.data);
        const fetchedMessages = response.data.data;
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("failed to fetch chat", error);
      }
    );
  };

  // 새 메시지를 보내는 함수
  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const formattedDate = `${year}.${String(month).padStart(2, "0")}.${String(
        day
      ).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;

      const messageObj = {
        channelId: channelId,
        nickName: nickName,
        registTime: formattedDate,
        message: inputValue,
      };
      stompClient.current.send(
        `/pub/message`,
        { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
        JSON.stringify(messageObj)
      );
      setInputValue("");
    }
    // console.log(nickName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-blue-50 w-full flex flex-col rounded-t-lg  lg:overflow-x-auto flex-grow">
          {messages.map((item, index) => {
            const showDate =
              index === 0 || isChangeDate(messages[index - 1], item);
            return (
              <div key={index} className="m-4 relative max-w-full">
                {showDate && (
                  <MessageDateComponent
                    date={item.registTime.substring(0, 10)}
                  />
                )}
                {item.nickName === nickName ? (
                  <MyMessageComponent item={item} index={index} />
                ) : (
                  <OtherMessageComponent item={item} index={index} />
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <ChatInputComponent
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
          mode={props.mode}
          setMode={props.setMode}
        />
      </div>
    </>
  );
}

export default ChatComponent;
