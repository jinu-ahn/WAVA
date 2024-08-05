import React from "react";


function MyMessageComponent(props) {
    return (
        <>
            <div className="flex flex-col items-end">
                <div className="text-right">
                    <p>{props.item.nickName}</p>
                </div>
                <div className="relative inline-block max-w-xs">
                    <div className=" bg-white text-dark p-2 rounded-md">
                        {props.item.message}
                    </div>
                    <div className="absolute right-0 -mt-0.5 w-0 border-t-8 border-t-white border-x-8 border-x-transparent border-b-0 rotate-[-135deg]"></div>
                </div>
            </div>
        </>
    )
}

export default MyMessageComponent;