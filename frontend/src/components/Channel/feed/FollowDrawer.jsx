import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDoubleRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import useDeviceStore from "../../../store/deviceStore";
import {
  readFollowUserRequest,
  readFollowerUserRequest,
} from "../../../api/channelFeedApi";

// 더미 데이터 (실제 구현 시 API에서 가져와야 함)

const FollowDrawer = ({
  isOpen,
  onClose,
  userNickName,
  activeTab,
  handleFollowClick,
  loginedUserNickName,
  setActiveTab,
}) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!userNickName) return;
      if (activeTab === "followers") {
        const resp = await readFollowUserRequest(userNickName);
        if (resp?.status === "OK") {
          setUsers(resp.data?.userList);
        }
      } else if (activeTab === "following") {
        const resp = await readFollowerUserRequest(userNickName);
        console.log(resp);
        if (resp?.status === "OK") {
          setUsers(resp.data?.userList);
        }
      }
    };
    getData();
  }, [activeTab, userNickName]);

  const handleUserClick = (userId) => {
    navigate(`/channel/feed/${userId}`);
    onClose();
  };

  const handleRequestFollow = async (nickName, status) => {
    setUsers((state) =>
      state.map((el) =>
        el.nickname === nickName ? { ...el, follower: !el.follower } : el
      )
    );
    await handleFollowClick("outContent", status, nickName);
  };

  return (
    <div className="drawer drawer-end z-20">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="drawer-side">
        <label
          className="drawer-overlay"
          style={{ backgroundColor: isOpen ? "#0003" : "transparent" }}
          onClick={onClose}
        />
        <div
          className={`${
            isMobile ? "w-11/12" : "w-2/3"
          } bg-white h-full p-6 flex flex-col`}
        >
          <button
            onClick={onClose}
            className="self-start mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronDoubleRightIcon className="h-6 w-6" />
          </button>

          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 ${
                activeTab === "following"
                  ? "bg-mainBlue text-white"
                  : "bg-gray-200"
              } rounded-l-lg`}
              onClick={() => setActiveTab("following")}
            >
              팔로잉
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "followers"
                  ? "bg-mainBlue text-white"
                  : "bg-gray-200"
              } rounded-r -lg`}
              onClick={() => setActiveTab("followers")}
            >
              팔로워
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.userId}
                className="flex items-center justify-between p-4 hover:bg-gray-100"
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleUserClick(user.nickname)}
                >
                  {user.profile ? (
                    <img
                      className="h-12 w-12 rounded-full border p-1 mx-1"
                      src={user.profile}
                    />
                  ) : (
                    <UserCircleIcon className="h-12 w-12 text-gray-400 mx-1" />
                  )}
                  <div>
                    <p className="text-black mx-2">{user.nickname}</p>
                    <p className="text-gray-700 text-xs mx-2">
                      {user?.hasFollowerRelationship && "나를 팔로우중"}
                    </p>
                  </div>
                </div>
                {loginedUserNickName !== user.nickname && (
                  <button
                    className={`px-4 py-2 rounded ${
                      user.follower ? "bg-gray-200" : "bg-mainBlue text-white"
                    }`}
                    onClick={() =>
                      handleRequestFollow(user.nickname, user.follower)
                    }
                  >
                    {user.follower ? "언팔로우" : "팔로우"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowDrawer;
