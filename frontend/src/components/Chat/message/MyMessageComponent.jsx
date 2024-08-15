import React from "react";

function MyMessageComponent(props) {
  return (
    <>
      <div className="flex flex-col items-end max-w-full">
        <div className="relative max-w-full">
          <div className="flex items-center max-w-full">
            <p className="self-end me-1 text-sm">
              {props.item.registTime ? props.item.registTime.substr(11) : ""}
            </p>
            <div className=" bg-blue-200 text-dark p-2.5 rounded-2xl break-all">
              {props.item.message}
            </div>
          </div>
          <div className="absolute right-0.5 -mt-1.5 w-0 border-t-8 border-t-blue-200 border-x-8 border-x-transparent border-b-0 rotate-[-135deg]"></div>
        </div>
      </div>
    </>
  );
}

export default MyMessageComponent;
