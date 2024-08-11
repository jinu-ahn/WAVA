// 풀방일 경우에 '가득찬 방' 이라고 버튼을 만들고
// 채널 참여: 파랑, 참여한 채널: 초록 , 가득찬 방: 빨강, 참여+풀방 : 빨강? 초록?
// 기본 카드 배경: 흰색, 가득 찬 경우에 카드 배경 색상: 노란색? 구분 지으면 어떨까요?? YES
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useChannelStore from "../../../store/channelStore";

function ChannelRoomItem({ roomInfo, onClick }) {
  const isJoinedChannel = useChannelStore((state) => state.followChannels).some(
    (el) => el.channelId === roomInfo.channelId
  );

  const navigate = useNavigate();

  const isFull = roomInfo.userCount > 3;
  // 참여한 채널인가?(참)->해당 채널로 이동
  //                (거짓)-> 풀방인가?(참)-> 조작 불가
  //                                 (거짓)-> active, join활성화

  const backgroundImages = [
    "url('/글래스.webp')",
    "url('/글래스2.webp')",
    "url('/글래스3.webp')",
    "url('/글래스4.webp')",
    "url('/글래스5.webp')",
    "url('/글래스7.webp')",
    "url('/글래스6.webp')",
    "url('/글래스8.webp')",
    "url('/글래스9.webp')",
    "url('/글래스10.webp')",
  ];

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const randomImage =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomImage);
  }, []);

  let titleText = "채널 참여";
  if (isFull) titleText = "참여 불가";
  if (isJoinedChannel) titleText = "채널로 이동";

  let btnColor = "bg-slate-600 hover:bg-blue-600";
  if (isFull) btnColor = "bg-slate-600 hover:bg-red-600";
  if (isJoinedChannel) btnColor = "bg-slate-600 hover:bg-green-700";

  const joinChannelHandle = () => {
    onClick();
  };

  let clickFunction = joinChannelHandle;
  if (isFull) clickFunction = null;
  if (isJoinedChannel)
    clickFunction = () => navigate(`/channel/group/${roomInfo.channelId}`);

  return (
    <div
      className="relative rounded-lg shadow-lg p-4 flex flex-col h-60 bg-cover bg-center hover:shadow-2xl transition-shadow duration-500"
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-lg"></div>

      <div className="relative flex justify-between items-center mb-2">
        <h3 className="text-2xl font-extrabold text-slate-500">
          {roomInfo.channelTitle}
        </h3>
        <span className={`text-sm ${isFull ? "text-red-600" : "text-black"}`}>
          {roomInfo.userCount}/4 👤
        </span>
      </div>
      <div className="relative flex-grow overflow-y-auto mb-4 mt-4">
        <p className="text-slate-600">{roomInfo.channelDescription}</p>
      </div>
      <div className="relative mt-auto flex justify-end">
        <button
          onClick={clickFunction}
          className={`${btnColor} text-white px-4 py-2 rounded transition-colors`}
        >
          {titleText}
        </button>
      </div>
    </div>
  );
}

export default ChannelRoomItem;
