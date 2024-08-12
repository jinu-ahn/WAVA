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
          className="rounded-full bg-slate-300 w-10 h-10 flex items-center justify-center hover:bg-slate-400 transition-colors duration-300"
          title="화상 채팅"
        >
          <VideoCameraIcon className="w-8 h-8 text-green-500" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 focus:outline-none"
        />
        <button className="text-white" onClick={sendMessage}>
          <ArrowUpCircleIcon className="w-10 fill-blue-600" />
        </button>
      </div>
    </>
  );
}

export default ChatInputComponent;
