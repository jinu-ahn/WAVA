import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatComponent from "../components/Chat/ChatComponent";
import MapComponent from "../components/Channel/group/MapComponent";
import ControllerComponent from "../components/Channel/group/ControllerComponent";
import { groupChannelAPI } from "../api/groupChannelAPI";
import LoadingSpinner from "../components/Channel/LoadingSpinner";
import Swal from "sweetalert2";
import VideoChatFunction from "../components/VideoChat/VideoChatFunction";

const GroupChannelPage = () => {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedUserNickName, setSelectedUserNickName] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  const handleSelectUser = (nickName) => {
    setSelectedUserNickName(nickName);
  };

  useEffect(() => {
    const isJoined = async () => {
      try {
        setLoading(true);
        // 그룹에 가입한 사람인지 확인하는 작업
        const resp = await groupChannelAPI.isValidatedGroupMember(groupId);
        if (resp?.data?.isJoin) {
          setHasAccess(true);
        } else {
          throw new Error("Not Joined Group-Channel");
        }
      } catch (error) {
        console.error("권한 확인 중 오류 발생:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "존재하지 않는 채널입니다!",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/channel/group/discover-groups"); // 오류 발생 시 검색 페이지로 이동
      } finally {
        setLoading(false);
      }
    };
    isJoined();
  }, [groupId, navigate]);

  const [mode, setMode] = useState(true);

  useEffect(() => {
    setMode(true);
  }, [groupId]);

  if (loading) {
    return <LoadingSpinner message={"채널을 이동중입니다."} />; // 로딩 중 표시
  }

  if (!hasAccess) {
    return null; // 리디렉션 처리 후에는 아무 것도 렌더링하지 않음
  }

  console.log(groupId);
  return (
    <div className="relative flex flex-col lg:flex-row h-screen">
      {/* 지도 컴포넌트 (3/4) */}

      <div className="flex-grow lg:w-3/4 h-1/2 lg:h-full">
        <MapComponent
          loading={loading}
          channelId={groupId}
          selectedUserNickName={selectedUserNickName}
          setSelectedUserNickName={setSelectedUserNickName}
        />
      </div>

      {/* 채팅 컴포넌트 (1/4) */}

      <div className="flex-grow h-1/2 flex flex-col lg:absolute lg:top-0 lg:right-0 z-20 lg:h-full lg:grid grid-rows-12">
        <div className="row-span-2 lg:mb-10 lg:mt-2 lg:me-2 lg:w-[300px]">
          <ControllerComponent
            mode={mode}
            setMode={setMode}
            groupId={groupId}
            onSelectUser={handleSelectUser}
          />
        </div>
        {mode ? (
          <div className="h-full lg:row-span-10 overflow-y-auto lg:-mt-6 lg:me-2 lg:mb-2 bg-white rounded-md">
            <ChatComponent mode={mode} setMode={setMode} channelId={groupId} />
          </div>
        ) : (
          <div className="h-full lg:row-span-10 lg:-mt-6 lg:me-2 lg:mb-2 lg:w-[300px] overflow-auto bg-transparent">
            <VideoChatFunction
              channelId={groupId}
              mode={mode}
              setMode={setMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChannelPage;
