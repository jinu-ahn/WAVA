function ChannelRoomItem({ roomInfo, onClick }) {
  const isFull = roomInfo.userCount > 3;

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
        onClick={isFull ? null : joinChannelHandle}
        className={`${
          isFull
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-blue-500 hover:bg-blue-600"
        }  text-white px-4 py-2 rounded  transition-colors`}
      >
        채널 참여
      </button>
    </div>
  );
}

export default ChannelRoomItem;
