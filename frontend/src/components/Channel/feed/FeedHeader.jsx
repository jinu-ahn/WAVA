import React, { useState } from "react";
import { Camera, CheckIcon, Edit, XIcon } from "lucide-react";
import FollowDrawer from "./FollowDrawer";
import useDeviceStore from "../../../store/deviceStore";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ProfileIconBtn from "./ProfileIconBtn";
import {
  createProfileImageRequest,
  followRequest,
  unfollowRequest,
  updateFeedDescription,
} from "../../../api/channelFeedApi";
import useUserStore from "../../../store/userStore";
import LoadingSpinner from "../LoadingSpinner";

const FeedHeader = ({
  openCreateDrawer,
  setUserInfo,
  userInfo,
  openDrawerRef,
}) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  // const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isFollowDrawerOpen, setIsFollowDrawerOpen] = useState(false);
  const [followDrawerTab, setFollowDrawerTab] = useState(null);

  const [editProfile, setEditProfile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const loginedUserNickName = useUserStore((state) => state.userInfo?.nickName);
  const setProfileImage = useUserStore((state) => state.setProfileImage);
  const ownerUserNickName = userInfo?.nickName;

  // const handleNameChange = (e) =>
  //   setUserInfo((state) => ({ ...state, nickname: e.target.value }));

  const handleBioChange = (e) =>
    setUserInfo((state) => ({ ...state, description: e.target.value }));

  // const handleNameSubmit = () => {
  //   setIsEditingName(false);
  // };

  const handleBioSubmit = async () => {
    await updateFeedDescription(userInfo.description);
    setIsEditingBio(false);
  };

  const handleProfilePicChange = (e) => {
    setEditProfile({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
    // console.log("Profile picture change requested", e.target.files[0]);
  };
  const openFollowDrawer = (tab) => {
    setFollowDrawerTab(tab);
    setIsFollowDrawerOpen(true);
  };

  const canceldProfilePicChange = () => {
    setEditProfile(null);
  };

  const handleSubmitProfilePicChange = async () => {
    if (!editProfile) return;
    setIsUploading(true); // 업로드 시작
    const formData = new FormData();
    formData.append("image", editProfile?.file);
    try {
      const resp = await createProfileImageRequest(formData);
      if (resp) {
        setProfileImage(resp.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setIsUploading(false); // 업로드 완료
    }
  };

  const handleFollowClick = async (type, status, nickName) => {
    let resp = false;
    if (status) {
      resp = await unfollowRequest(nickName);
      if (resp?.status === "OK") {
        // 언팔로우
        if (loginedUserNickName === ownerUserNickName) {
          setUserInfo((status) => ({
            ...status,
            follow: status.follow - 1,
            following: false,
          }));
        } else {
          if (type === "inContent") {
            setUserInfo((status) => ({
              ...status,
              follower: status.follower - 1,
              following: false,
            }));
          }
        }
      }
    } else {
      // 팔로우
      resp = await followRequest(nickName);
      if (resp?.status === "OK") {
        if (loginedUserNickName === ownerUserNickName) {
          setUserInfo((status) => ({
            ...status,
            follow: status.follow + 1,
            following: true,
          }));
        } else {
          if (type === "inContent") {
            setUserInfo((status) => ({
              ...status,
              follower: status.follower + 1,
              following: true,
            }));
          }
        }
      }
      // }
    }
  };
  return (
    <div
      className={isMobile ? "p-4" : "p-6"}
      style={{ fontFamily: "'IBM Plex Sans KR', sans-serif" }}
    >
      <div
        className={`flex ${isMobile ? "flex-col items-center" : "items-start"}`}
      >
        {!editProfile && (
          <div className={`relative ${isMobile ? "mb-4" : "mr-6"}`}>
            {!userInfo ? (
              <div
                className="
            rounded-full w-24 h-24 mx-auto bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
              />
            ) : userInfo?.profileImage ? (
              <img
                src={userInfo?.profileImage}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover shadow-md"
              />
            ) : (
              <UserCircleIcon className="w-24 h-24 rounded-full shadow-md" />
            )}
            {loginedUserNickName === ownerUserNickName && (
              <ProfileIconBtn customStyle="bg-white">
                <Camera size={20} />
                <input
                  id="profile-pic-upload"
                  type="file"
                  className="hidden"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                />
              </ProfileIconBtn>
            )}
          </div>
        )}

        {editProfile && (
          <div className={`relative ${isMobile ? "mb-4" : "mr-6"}`}>
            <img
              alt="profile-preview"
              className="rounded-full w-24 h-24 object-cover shadow-md"
              src={editProfile?.url}
            />
            <ProfileIconBtn
              onClick={canceldProfilePicChange}
              isLeft
              customStyle="bg-white"
            >
              <XIcon className="text-red-600" size={20} />
            </ProfileIconBtn>
            <ProfileIconBtn
              onClick={handleSubmitProfilePicChange}
              customStyle="bg-green-500"
            >
              <CheckIcon className=" text-white" size={20} />
            </ProfileIconBtn>
          </div>
        )}

        <div className={`flex-1 ${isMobile ? "w-full" : ""}`}>
          <div
            className={`flex ${
              isMobile
                ? "flex-col items-center"
                : "justify-between items-center"
            } mb-2`}
          >
            <div className={`flex items-center ${isMobile ? "mb-2" : ""}`}>
              <h1
                className={`${
                  isMobile ? "text-xl" : "text-2xl"
                } font-bold mr-2`}
              >
                {userInfo?.nickName || " - - - "}
              </h1>
            </div>
            {loginedUserNickName === ownerUserNickName ? (
              <button
                ref={openDrawerRef}
                onClick={openCreateDrawer}
                className={`px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors ${
                  isMobile ? "w-full" : ""
                }`}
              >
                글 작성
              </button>
            ) : (
              userInfo && (
                <>
                  <button
                    className={`px-4 py-2 rounded ${
                      userInfo?.following
                        ? "bg-gray-200"
                        : "bg-mainBlue text-white"
                    }`}
                    onClick={() =>
                      handleFollowClick(
                        "inContent",
                        userInfo.following,
                        userInfo.nickName
                      )
                    }
                  >
                    {userInfo?.following ? "언팔로우" : "팔로우"}
                  </button>
                </>
              )
            )}
          </div>

          <div className="mb-4">
            {isEditingBio ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={userInfo?.description}
                  onChange={handleBioChange}
                  className="flex-grow mr-2 p-1 border rounded"
                />
                <button
                  onClick={handleBioSubmit}
                  className="px-2 py-1 bg-green-500 text-white text-xs rounded"
                >
                  저장
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">
                  {userInfo?.description || " - - - - - "}
                </p>
                {loginedUserNickName === ownerUserNickName && (
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Edit size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
          <div
            className={`text-sm text-gray-600 flex ${
              isMobile ? "justify-center" : "justify-start"
            }`}
          >
            <button
              onClick={() => openFollowDrawer("following")}
              className="mr-4 hover:underline"
            >
              팔로잉{" "}
              <span className="font-semibold">
                {Number.isInteger(userInfo?.follow) ? userInfo?.follow : "-"}
              </span>
            </button>
            <button
              onClick={() => openFollowDrawer("followers")}
              className="mr-4 hover:underline"
            >
              팔로워{" "}
              <span className="font-semibold">
                {Number.isInteger(userInfo?.follower)
                  ? userInfo?.follower
                  : "-"}
              </span>
            </button>
            <span>
              게시물{" "}
              <span className="font-semibold">
                {Number.isInteger(userInfo?.feedCount)
                  ? userInfo?.feedCount
                  : "-"}
              </span>
            </span>
          </div>
        </div>
      </div>
      <FollowDrawer
        loginedUserNickName={loginedUserNickName}
        setActiveTab={setFollowDrawerTab}
        handleFollowClick={handleFollowClick}
        isOpen={isFollowDrawerOpen}
        onClose={() => setIsFollowDrawerOpen(false)}
        userNickName={userInfo?.nickName}
        activeTab={followDrawerTab}
      />
      {isUploading && (
        <LoadingSpinner message="프로필 사진을 변경중입니다." /> // 추가: 프로필 사진 변경 중 로딩 스피너 표시
      )}
    </div>
  );
};

export default FeedHeader;
