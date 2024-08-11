import React, { useEffect, useState } from "react";
import useDeviceStore from "../../store/deviceStore";
import useUserStore from "../../store/userStore";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  GlobeAltIcon,
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const Explorer = () => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const logoutFunc = useUserStore((state) => state.logoutFunc);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (isMobile) {
    return null;
  }
  // 대시보드, 채널에서 사용하는 navbar
  return (
    <>
      {/* Explorer 컴포넌트의 너비를 비례적으로 조정 */}
      <div
        className={`relative ${
          isMobile ? "w-[42px]" : "w-12 min-w-[48px]"
        } max-w-[110px]`}
      >
        <div
          className={`text-mainTxt h-full min-h-[500px]`}
          style={{
            backgroundColor: "rgba(40, 57, 67, 0.7)", // 반투명 검은색 배경
            // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)", // 부드러운 그림자 효과
          }}
        >
          <NavLink className="hover:text-mainBlue" to="/">
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right z-[11]"
              data-tip="Home"
            >
              <HomeIcon
                className={`size-8 ${animate ? "animate-dropIn" : ""}`}
              />
            </div>
          </NavLink>
          <NavLink className="hover:text-mainBlue" to="/channel">
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right  z-[11]"
              data-tip="Channels"
            >
              <GlobeAltIcon
                stroke="currentColor"
                className={`size-8  hover:text-mainBlue  ${
                  animate ? "animate-dropIn" : ""
                }`}
              />
            </div>
          </NavLink>
          <NavLink className="hover:text-black" to="/dashboard">
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right  z-[11]"
              data-tip="Dashboard"
            >
              <CalendarIcon
                className={`size-8  hover:text-mainBlue ${
                  animate ? "animate-dropIn" : ""
                }`}
              />
            </div>
          </NavLink>
        </div>
        <div
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        >
          <Link className="hover:text-black" to="/" onClick={logoutFunc}>
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right z-[11]"
              data-tip="Logout"
            >
              <ArrowLeftStartOnRectangleIcon
                className={`size-8 hover:text-mainBlue ${
                  animate ? "animate-dropIn" : ""
                }`}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Explorer;
