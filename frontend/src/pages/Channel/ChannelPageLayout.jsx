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
import useChannelStore from "../../store/channelStore";

function ChannelPage() {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const userInfo = useUserStore((state) => state.userInfo);
  const { followChannels, setFollowChannels } = useChannelStore();

  const myId = userInfo?.nickName;

  const myChannelRef = useRef(null);
  const GroupChannelsRef = useRef(null);
  const infoChannelsRef = useRef(null);

  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  useLayoutEffect(() => {
    if (location.pathname?.replaceAll("/", "") === "channel") {
      navigate(`/channel/feed/${myId}`);
    }
  }, [location.pathname, navigate, userId]);

  useEffect(() => {
    const getMyGroupData = async () => {
      const resp = await groupChannelAPI.getMyChannel();
      if (resp) setFollowChannels(resp?.data);
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

  const handleChannelPortalOpen = () => {
    setIsCreateChannelOpen(true);
  };

  const handleChannelPortalClose = () => {
    setIsCreateChannelOpen(false);
  };

  return (
    <div
      className="flex h-screen bg-gray-100"
      style={{ fontFamily: "'IBM Plex Sans KR', sans-serif" }}
    >
      <Explorer />

      <div className="flex flex-col w-16 bg-blue-50 shadow-lg h-screen">
        {isMobile && <MobileExplorer />}
        <div className="flex-grow overflow-y-auto">
          {/* My channel */}
          <div ref={myChannelRef}>
            <div className="sticky top-0 bg-blue-50 z-10 py-1.5 font-semibold text-gray-700 text-xs text-center">
              내 채널
            </div>
            <NavLink to={`/channel/feed/${myId}`} className="block p-2">
              {userInfo?.profile ? (
                <img
                  src={userInfo.profile}
                  alt="Profile"
                  className="w-12 h-12 mx-auto rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-200 hover:border-blue-400"
                />
              ) : (
                <UserCircleIcon className="w-12 h-12 mx-auto rounded-full text-blue-500 hover:text-blue-600 transition-all duration-300" />
              )}
            </NavLink>
          </div>

          {/* Info channels */}
          <div ref={infoChannelsRef}>
            <div className="sticky top-0 bg-blue-50 z-10 py-1.5 font-semibold text-gray-700 text-xs text-center">
              정보 채널
            </div>
            <NavLink to={`/channel/feed`} className="block p-2">
              <GlobeAltIcon className="w-12 h-12 mx-auto border border-gray-300 rounded-full shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300 text-blue-500" />
            </NavLink>
          </div>

          {/* Group channels */}
          <div ref={GroupChannelsRef}>
            <ChannelSubExplorer
              type="group"
              data={followChannels}
              toolbarBtn={
                <div className="sticky top-0 bg-blue-50 z-10">
                  <div className="py-1.5 font-semibold text-gray-700 text-xs text-center">
                    모임 채널
                  </div>
                  <div className="flex flex-col items-center space-y-3 mb-3">
                    <button
                      onClick={handleChannelPortalOpen}
                      className="w-12 h-12 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <PlusIcon className="w-6 h-6 text-blue-500" />
                    </button>
                    <NavLink
                      to="/channel/group/discover-groups"
                      className="w-12 h-12 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <MagnifyingGlassIcon className="w-6 h-6 text-blue-500" />
                    </NavLink>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-white shadow-lg overflow-hidden">
        <Outlet />
      </div>

      {/* Channel creation modal */}
      <CustomModal
        styles={"backdrop-blur-sm"}
        isOpen={isCreateChannelOpen}
        onClose={handleChannelPortalClose}
      >
        <CreateGroupChannel onClose={handleChannelPortalClose} />
      </CustomModal>
    </div>
  );
}

export default ChannelPage;
