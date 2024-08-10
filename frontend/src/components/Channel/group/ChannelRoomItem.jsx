// 풀방일 경우에 '가득찬 방' 이라고 버튼을 만들고
// 채널 참여: 파랑, 참여한 채널: 초록 , 가득찬 방: 빨강, 참여+풀방 : 빨강? 초록?
// 기본 카드 배경: 흰색, 가득 찬 경우에 카드 배경 색상: 노란색? 구분 지으면 어떨까요??

import useChannelStore from "../../../store/channelStore";

function ChannelRoomItem({ roomInfo, onClick }) {
  const isJoinedChannel = useChannelStore((state) => state.followChannels).some(
    (el) => el.channelId === roomInfo.channelId
  );

  const isFull = roomInfo.userCount > 3;

  const isActive = isJoinedChannel ? false : isFull ? false : true;
  // 참여한 채널인가?(참)->notactive
  //                (거짓)-> 풀방인가?(참)-> notactive
  //                                 (거짓)-> active, join활성화

  let titleText = "채널 참여";
  if (isFull) titleText = "참여 불가";
  if (isJoinedChannel) titleText = "참여한 채널";

  let btnColor = "bg-blue-500 hover:bg-blue-600";
  if (isFull) btnColor = "bg-red-500 hover:bg-red-600";
  if (isJoinedChannel) btnColor = "bg-green-500 hover:bg-green-600";

  const joinChannelHandle = () => {
    onClick();
  };
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{roomInfo.channelTitle}</h3>
        <span
          className={`text-sm ${isFull ? "text-red-600" : "text-gray-500"} `}
        >
          {roomInfo.userCount}/4 👤
        </span>
      </div>
      <p className="text-gray-600 mb-4">{roomInfo.channelDescription}</p>
      <button
        onClick={isActive ? joinChannelHandle : null}
        className={`${btnColor}  text-white px-4 py-2 rounded  transition-colors`}
      >
        {titleText}
      </button>
    </div>
  );
}

export default ChannelRoomItem;
