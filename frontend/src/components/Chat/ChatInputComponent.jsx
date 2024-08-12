import React from "react";
import { ArrowUpCircleIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

function ChatInputComponent(props) {
  const {inputValue, handleInputChange, handleKeyDown, mode, setMode, sendMessage} = props
  const changeMode = () => {
    setMode(!mode);
  };
  return (
    <>
      <div className="p-2 w-full flex shadow-md rounded-b-lg items-center">
        <button
          onClick={changeMode}
          className="rounded-full bg-white w-8 h-8 shadow-lg flex items-center justify-center hover:text-vacationMid hover:bg-slate-100 transition-colors duration-300"
          title="화상 채팅"
        >
          <VideoCameraIcon className="w-6 h-6 text-slate-500" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 focus:outline-none"
        />
        <button className="text-white w-8 h-8" onClick={sendMessage}>
          <ArrowUpCircleIcon className="w-8 fill-blue-600 hover:fill-blue-700 rounded-full shadow-lg" />
        </button>
      </div>
    </>
  );
}

export default ChatInputComponent;
