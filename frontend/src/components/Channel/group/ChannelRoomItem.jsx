// 풀방일 경우에 '가득찬 방' 이라고 버튼을 만들고
// 채널 참여: 파랑, 참여한 채널: 초록 , 가득찬 방: 빨강, 참여+풀방 : 빨강? 초록?
// 기본 카드 배경: 흰색, 가득 찬 경우에 카드 배경 색상: 노란색? 구분 지으면 어떨까요?? YES

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

  let titleText = "채널 참여";
  if (isFull) titleText = "참여 불가";
  if (isJoinedChannel) titleText = "채널로 이동";

  let btnColor = "bg-mainBlue hover:bg-blue-600";
  if (isFull) btnColor = "bg-gray-500 hover:bg-red-600";
  if (isJoinedChannel) btnColor = "bg-green-700 hover:bg-green-600";

  const joinChannelHandle = () => {
    onClick();
  };

  let clickFunction = joinChannelHandle;
  if (isFull) clickFunction = null;
  if (isJoinedChannel)
    clickFunction = () => navigate(`/channel/group/${roomInfo.channelId}`);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-60">
      {" "}
      {/* 높이 고정 */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{roomInfo.channelTitle}</h3>
        <span
          className={`text-sm ${isFull ? "text-red-600" : "text-gray-500"} `}
        >
          {roomInfo.userCount}/4 👤
        </span>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        {" "}
        {/* 스크롤 가능한 설명 영역 */}
        <p className="text-gray-600">{roomInfo.channelDescription}</p>
      </div>
      <div className="mt-auto">
        {" "}
        {/* 버튼을 하단에 고정 */}
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
