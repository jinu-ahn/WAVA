import React, { useEffect, useState } from "react";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ChannelUserComponent } from "./ChannelUserComponent";
import { groupChannelAPI } from "../../../api/groupChannelAPI"

export default function ControllerComponent(props) {
  const { mode, setMode, groupId, onSelectUser } = props
  const [userList, setUserList] = useState(null)
  const [userItems, setUserItems] = useState(null)

  // const changeMode = () => {
  //   setMode(!mode);
  // };

  const getUserList = async () => {
      setUserList(null);
      try {
        const userData = await groupChannelAPI.getChannelInfo(groupId);
        if (userData.status === "OK") {
          console.log(userData)
          setUserList(userData.data.user);   
        }
      } catch (error) {
        console.error("Error get channel userinfo: ", error);
      }
  }
  
  useEffect(() => {
    getUserList();
  }, [groupId])

  useEffect(() => {
    if (userList) {
      const items = userList.map((user) => 
        <ChannelUserComponent nickName={user.nickName} profileImg={user.profile} onClick={onSelectUser} />
      );
      setUserItems(items);
    }
  }, [userList])


  return (
    <>
      <div className="bg-white rounded-md drop-shadow-md flex justify-evenly items-center h-full p-1">
        {userItems}
      </div>
    </>
  );
}
