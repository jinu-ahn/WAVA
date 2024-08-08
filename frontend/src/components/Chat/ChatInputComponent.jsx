import React from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

function ChatInputComponent(props) {
  return (
    <>
      <div className="p-2 w-full flex shadow-md rounded-b-lg items-center">
        <input
          type="text"
          value={props.inputValue}
          onChange={props.handleInputChange}
          onKeyDown={props.handleKeyDown}
          className="flex-grow p-2 focus:outline-none"
        />
        <button className="text-white" onClick={props.sendMessage}>
          <ArrowUpCircleIcon className="w-10 fill-blue-600" />
        </button>
      </div>
    </>
  );
}

export default ChatInputComponent;
