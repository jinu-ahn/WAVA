import React from "react";

function OtherMessageComponent(props) {
  // const today = new Date()
  // const hours = ('0' + today.getHours()).slice(-2);
  // const minutes = ('0' + today.getMinutes()).slice(-2);

  return (
    <>
      <div className="flex flex-col items-start">
        <div className="text-right">
          <p>{props.item.nickName}</p>
        </div>
        <div className="relative inline-block max-w-xs">
          <div className="flex">
            <div className="break-all bg-blue-200 text-dark p-3 rounded-2xl">
              {props.item.message}
            </div>
            <p className="self-end ms-1 text-sm">
              {props.item.registTime ? props.item.registTime.substr(11) : ""}
            </p>
          </div>
          <div className="absolute left-0.5 -mt-1.5 w-0 border-t-8 border-t-blue-200 border-x-8 border-x-transparent border-b-0 rotate-[135deg]"></div>
        </div>
      </div>
    </>
  );
}

export default OtherMessageComponent;
