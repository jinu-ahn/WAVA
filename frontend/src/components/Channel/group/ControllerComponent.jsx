import React, { useEffect, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChannelUserComponent } from "./ChannelUserComponent";
import { groupChannelAPI } from "../../../api/groupChannelAPI";
import useChannelStore from "../../../store/channelStore";

export default function ControllerComponent(props) {
  const { groupId, onSelectUser } = props;
  // const [userList, setUserList] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const userList = useChannelStore((state) => state.channelUserList);
  const setUserListAndMyInfo = useChannelStore((state) => state.setUserListAndMyInfo);

  const getUserList = async () => {
    try {
      const userData = await groupChannelAPI.getChannelInfo(groupId);
      if (userData.status === "OK") {
        // console.log(userData);
        setUserListAndMyInfo(userData.data.user);
      }
    } catch (error) {
      console.error("Error get channel userinfo: ", error);
    }
  };

  useEffect(() => {
    getUserList();
  }, [groupId])

  useEffect(() => {
    if (userList) {
      const items = userList.map((user) => (
        <ChannelUserComponent
          key={user.nickName}
          nickName={user.nickName}
          profileImg={user.profile}
          onClick={onSelectUser}
        />
      ));
      setUserItems(items);
    }
  }, [userList]);

  return (
    <div className="relative">
      <div
        className="absolute top-0.5 left-0.5 h-4 w-4 opacity-70 cursor-pointer z-10 text-red-900"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <QuestionMarkCircleIcon />
      </div>
      {showTooltip && (
        <div
          className="absolute bg-gray-800 text-white p-2 rounded-md shadow-md max-w-xs opacity-70 z-50" // z-50 클래스로 z-index 높이기
          style={{ top: "70%", left: "0.5rem", marginTop: "-2rem" }} // 툴팁을 위로 올림
        >
          사용자의 커서를 따라가려면 프로필 이미지를 클릭하세요.
        </div>
      )}
      <div className="bg-white rounded-md drop-shadow-md flex justify-evenly items-center p-1 mt-1">
        {userItems}
      </div>
    </div>
  );
}
