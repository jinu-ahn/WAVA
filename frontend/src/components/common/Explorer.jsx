import React, { useEffect, useState } from "react";
import useDeviceStore from "../../store/deviceStore";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

const Explorer = () => {
  const isMobile = useDeviceStore((state) => state.isMobile);

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
        <div className={`bg-base-300 text-mainTxt h-full min-h-[500px]`}>
          <NavLink className="hover:text-btnBlue " to="/">
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right  z-[11]"
              data-tip="Home"
            >
              <HomeIcon
                className={`size-8 ${animate ? "animate-dropIn" : ""}`}
              />
            </div>
          </NavLink>
          <NavLink className="hover:text-btnBlue" to="/channel">
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right  z-[11]"
              data-tip="Channels"
            >
              <RectangleGroupIcon
                stroke="currentColor"
                className={`size-8  hover:text-btnBlue  ${
                  animate ? "animate-dropIn" : ""
                }`}
              />
            </div>
          </NavLink>
          <NavLink className="hover:text-btnBlue" to="/dashboard">
            <div
              className="py-3.5 flex justify-center items-center tooltip tooltip-right  z-[11]"
              data-tip="dashboard"
            >
              <CalendarDaysIcon
                className={`size-8  hover:text-btnBlue ${
                  animate ? "animate-dropIn" : ""
                }`}
              />
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Explorer;
