import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import useDeviceStore from "../../../store/deviceStore";

const ArrowButton = ({ direction }) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const isLeft = direction === "left";
  return (
    <button
      className={`absolute top-1/2 transform -translate-y-1/2 ${
        isLeft ? "-left-1 -translate-x-full " : "-right-1 translate-x-full "
      } flex items-center justify-center ${
        isMobile ? "w-8 h-8" : "w-12 h-12"
      }   hover:bg-opacity-70 active:scale-75  transition-transform duration-150`}
      aria-label={`Arrow ${direction}`}
    >
      {isLeft ? (
        <ArrowLeftIcon className="w-6 h-6 text-mainBlue" />
      ) : (
        <ArrowRightIcon className="w-6 h-6 text-mainBlue" />
      )}
    </button>
  );
};
export default ArrowButton;
