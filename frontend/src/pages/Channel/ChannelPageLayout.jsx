import Explorer from "../../components/common/Explorer";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MobileExplorer from "../../components/common/MobileExplorer";
import useDeviceStore from "../../store/deviceStore";
import ChannelSubExplorer from "../../components/Channel/ChannelSubExplorer";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  GlobeAltIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CustomModal from "../../components/common/customModal";
import CreateGroupChannel from "../../components/Channel/group/CreateGroupChannel";
import useUserStore from "../../store/userStore";
import { groupChannelAPI } from "../../api/groupChannelAPI";

function ChannelPage() {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const userInfo = useUserStore((state) => state.userInfo);
  const myId = userInfo?.nickName;

  const myChannelRef = useRef(null);
  const GroupChannelsRef = useRef(null);
  const infoChannelsRef = useRef(null);

  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [myChannelList, setMyChannelList] = useState([]);

  useLayoutEffect(() => {
    // 현재 경로가 정확히 '/channel'일 때만 리다이렉트
    if (location.pathname?.replaceAll("/", "") === "channel") {
      navigate(`/channel/feed/${myId}`);
    }
  }, [location.pathname, navigate, userId]);

  useEffect(() => {
    const getMyGroupData = async () => {
      const resp = await groupChannelAPI.getMyChannel();
      if (resp) setMyChannelList(resp?.data);
    };
    getMyGroupData();
  }, []);

  const handleMouseEvents = (ref) => {
    let isDown = false;
    let startY;
    let scrollTop;

    const onMouseDown = (e) => {
      isDown = true;
      startY = e.pageY - ref.current.offsetTop;
      scrollTop = ref.current.scrollTop;
    };

    const onMouseLeave = () => {
      isDown = false;
    };

    const onMouseUp = () => {
      isDown = false;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      // e.preventDefault();
      const y = e.pageY - ref.current.offsetTop;
      const walk = (y - startY) * 2;
      ref.current.scrollTop = scrollTop - walk;
    };

    ref.current.addEventListener("mousedown", onMouseDown, { passive: true });
    ref.current.addEventListener("mouseleave", onMouseLeave, { passive: true });
    ref.current.addEventListener("mouseup", onMouseUp, { passive: true });
    ref.current.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      ref.current.removeEventListener("mousedown", onMouseDown, {
        passive: true,
      });
      ref.current.removeEventListener("mouseleave", onMouseLeave, {
        passive: true,
      });
      ref.current.removeEventListener("mouseup", onMouseUp, { passive: true });
      ref.current.removeEventListener("mousemove", onMouseMove, {
        passive: true,
      });
    };
  };

  const handleTouchEvents = (ref) => {
    let isDown = false;
    let startY;
    let scrollTop;

    const onTouchStart = (e) => {
      isDown = true;
      startY = e.touches[0].pageY - ref.current.offsetTop;
      scrollTop = ref.current.scrollTop;
    };

    const onTouchEnd = () => {
      isDown = false;
    };

    const onTouchMove = (e) => {
      if (!isDown) return;
      // e.preventDefault();
      const y = e.touches[0].pageY - ref.current.offsetTop;
      const walk = (y - startY) * 2;
      ref.current.scrollTop = scrollTop - walk;
    };

    ref.current.addEventListener("touchstart", onTouchStart, { passive: true });
    ref.current.addEventListener("touchend", onTouchEnd, { passive: true });
    ref.current.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      ref.current.removeEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      ref.current.removeEventListener("touchend", onTouchEnd, {
        passive: true,
      });
      ref.current.removeEventListener("touchmove", onTouchMove, {
        passive: true,
      });
    };
  };

  React.useEffect(() => {
    handleMouseEvents(myChannelRef);
    handleMouseEvents(GroupChannelsRef);
    handleMouseEvents(infoChannelsRef);
    handleTouchEvents(myChannelRef);
    handleTouchEvents(GroupChannelsRef);
    handleTouchEvents(infoChannelsRef);
  }, []);

  // 채널 생성 포탈 오픈
  const handleChannelPortalOpen = () => {
    setIsCreateChannelOpen(true);
  };

  // 채널 생성 포탈 닫기
  const handleChannelPortalClose = () => {
    setIsCreateChannelOpen(false);
  };
  return (
    <>
      <div className="flex h-screen ">
        {/* navbar */}
        <Explorer />

        {/* 여기부터 채널 탐색기 */}
        <div className="flex flex-col w-16 bg-white h-screen">
          <div className="flex-shrink-0 text-center"></div>

          {/* 내채널 */}
          <div ref={myChannelRef} className="flex-shrink-0 text-center">
            <div>
              {isMobile && <MobileExplorer />}
              <div className="sticky top-0 bg-white z-10">
                <span>내 채널</span>
              </div>
            </div>
            <div className="my-0.5">
              <NavLink to={`/channel/feed/${myId}`}>
                {userInfo?.profile ? (
                  <img
                    src={userInfo?.profile}
                    className="w-10 h-10 mx-auto my-0.5 bg-gray-300 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 mx-auto my-0.5 rounded-full" />
                )}
              </NavLink>
            </div>
            {/* </ChannelSubExplorer> */}
          </div>

          <div className="divider my-1 mx-2" />
          {/* 정보채널 */}
          <div ref={infoChannelsRef} className="overflow-y-auto text-center">
            <div className="sticky top-0 bg-white z-10">
              <span className="text-sm">정보 채널</span>
            </div>

            <div>
              <NavLink to={`/channel/feed`}>
                <GlobeAltIcon className="w-10 h-10 mx-auto my-2 border border-gray-300 rounded-full " />
              </NavLink>
            </div>
          </div>
          <div className="divider my-1 mx-2" />

          {/* 모임채널 */}
          <div
            ref={GroupChannelsRef}
            className=" flex-1 overflow-y-auto text-center mb-2"
          >
            <ChannelSubExplorer
              // 그룹 생성 버튼(플러스버튼), 그룹 찾기 버튼(점점점)
              toolbarBtn={
                <div className="sticky top-0">
                  <div
                    onClick={handleChannelPortalOpen}
                    className=" bg-white flex items-center justify-center"
                  >
                    <div className="border cursor-pointer rounded-full h-10 w-10 hover border-gray-300 hover:bg-gray-100 transition-colors duration-200 ">
                      <PlusIcon className="w-6 h-6 m-4 mx-auto my-2 " />
                    </div>
                  </div>
                  <NavLink
                    to="/channel/group/discover-groups"
                    className="py-2 bg-white flex items-center justify-center"
                  >
                    <div className="border cursor-pointer rounded-full h-10 w-10 hover border-gray-300 hover:bg-gray-100 transition-colors duration-200 ">
                      <MagnifyingGlassIcon className="w-6 h-6 m-4 mx-auto my-2 " />
                    </div>
                  </NavLink>
                </div>
              }
              type="group"
              data={myChannelList}
            >
              <div className="sticky top-0 bg-white">
                <span className="text-sm">모임 채널</span>
              </div>
            </ChannelSubExplorer>
          </div>
        </div>

        {/* 채널 탐색기 끝, 하단은 콘텐츠 영역 */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      {/* 채널 생성 포탈 */}
      <CustomModal
        styles={"backdrop-blur-sm"}
        isOpen={isCreateChannelOpen}
        onClose={handleChannelPortalClose}
      >
        <CreateGroupChannel onClose={handleChannelPortalClose} />
      </CustomModal>
    </>
  );
}

export default ChannelPage;
