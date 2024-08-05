import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDoubleRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import useDeviceStore from "../../../store/deviceStore";

// 더미 데이터 (실제 구현 시 API에서 가져와야 함)
const dummyUsers = [
  { id: "1", name: "Alice", username: "alice123", followStatus: "follower" },
  { id: "2", name: "Bob", username: "bob456", followStatus: "mutual" },
  {
    id: "3",
    name: "Charlie",
    username: "charlie789",
    followStatus: "following",
  },
  { id: "4", name: "David", username: "david101", followStatus: "follower" },
  { id: "5", name: "Eva", username: "eva202", followStatus: "none" },
];

const FollowDrawer = ({
  isOpen,
  onClose,
  userId,
  initialTab = "followers",
}) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 실제 구현에서는 여기서 API를 호출하여 팔로워와 팔로잉 목록을 가져옵니다.
    setUsers(dummyUsers);
  }, [userId]);

  const handleUserClick = (userId) => {
    navigate(`/channel/feed/${userId}`);
    onClose();
  };

  const handleFollowClick = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          switch (user.followStatus) {
            case "none":
              return { ...user, followStatus: "following" };
            case "follower":
              return { ...user, followStatus: "mutual" };
            case "following":
            case "mutual":
              return {
                ...user,
                followStatus:
                  user.followStatus === "mutual" ? "follower" : "none",
              };
            default:
              return user;
          }
        }
        return user;
      })
    );
    // 실제 구현에서는 여기서 팔로우/언팔로우 API를 호출해야 합니다.
  };

  const filteredUsers =
    activeTab === "followers"
      ? users.filter((user) =>
          ["follower", "mutual"].includes(user.followStatus)
        )
      : users.filter((user) =>
          ["following", "mutual"].includes(user.followStatus)
        );

  const getFollowButtonText = (followStatus) => {
    switch (followStatus) {
      case "none":
      case "follower":
        return "팔로우";
      case "following":
      case "mutual":
        return "언팔로우";
    }
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
                activeTab === "followers"
                  ? "bg-mainBlue text-white"
                  : "bg-gray-200"
              } rounded-l-lg`}
              onClick={() => setActiveTab("followers")}
            >
              팔로워
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "following"
                  ? "bg-mainBlue text-white"
                  : "bg-gray-200"
              } rounded-r-lg`}
              onClick={() => setActiveTab("following")}
            >
              팔로잉
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-100"
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  <UserCircleIcon className="h-12 w-12 text-gray-400 mr-4" />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded ${
                    ["following", "mutual"].includes(user.followStatus)
                      ? "bg-gray-200"
                      : "bg-mainBlue text-white"
                  }`}
                  onClick={() => handleFollowClick(user.id)}
                >
                  {getFollowButtonText(user.followStatus)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowDrawer;
