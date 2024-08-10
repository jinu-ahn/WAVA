import { useEffect, useState } from "react";
import useDeviceStore from "../../../store/deviceStore";
import { groupChannelAPI } from "../../../api/groupChannelAPI";
import { useNavigate } from "react-router-dom";
import useChannelStore from "../../../store/channelStore";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function GroupInfoModal({ onClose, groupId }) {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const { addFollowChannels } = useChannelStore();

  const [channelData, setChannelData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const resp = await groupChannelAPI.getChannelInfo(groupId);
      if (resp) setChannelData(resp?.data);
    };
    getData();
  }, [groupId]);

  const joinHandle = async () => {
    const resp = await groupChannelAPI.joinGroupRequest(groupId);
    if (resp.status === "OK") {
      addFollowChannels(resp.data);
      navigate("/channel/group/" + resp.data.channelId);
    }
    console.log("join");
  };

  return (
    <div
      className={`h-1/2 overflow-y-auto ${
        isMobile ? "scale-90 transform origin-top " : ""
      } select-none p-5`}
    >
      <p className="text-2xl text-center font-bold">
        {channelData?.channelTitle || "LOADING..."}
      </p>
      <div className="divider" />
      <p>{channelData?.channelDescription || "LOADING..."}</p>

      <div className="divider" />
      <div>
        {channelData?.user?.map((person) => (
          <div
            key={person.nickName}
            className="flex w-full items-center space-x-3"
          >
            {person.profile ? (
              <img
                src={person.profile}
                alt={person.nickName}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-10 w-10 rounded-full" />
            )}
            <div>
              <p className="text-sm font-medium">{person.nickName}</p>
              <p className="text-xs text-gray-500">{person.role || ""}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="mb-4 font-medium">채널에 참여하시겠습니까?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={joinHandle}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupInfoModal;
