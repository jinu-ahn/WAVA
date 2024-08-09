import React from "react";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export default function ControllerComponent(props) {
  const changeMode = () => {
    props.setMode(!props.mode);
  };

  return (
    <>
      <div className="bg-white flex justify-end items-center h-full p-1">
        <button
          onClick={changeMode}
          className="rounded-full bg-slate-300 w-10 h-10 flex items-center justify-center hover:bg-slate-400 transition-colors duration-300"
          title="화상 채팅"
        >
          <VideoCameraIcon className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </>
  );
}
