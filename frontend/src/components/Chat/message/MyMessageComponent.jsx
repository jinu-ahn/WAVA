import React from "react";


function MyMessageComponent(props) {

    // const today = new Date()
    // const hours = ('0' + today.getHours()).slice(-2);
    // const minutes = ('0' + today.getMinutes()).slice(-2);
    // hours+ ':' + minutes
    return (
        <>
            <div className="flex flex-col items-end">
                <div className="text-right">
                </div>
                <div className="relative inline-block max-w-xs">
                    <div className="flex">
                        <p className="self-end me-1">{props.item.registTime ? props.item.registTime.substr(11) : ''}</p>
                        <div className=" bg-white text-dark p-2 rounded-md">
                            {props.item.message}
                        </div>
                    </div>
                    <div className="absolute right-0 -mt-0.5 w-0 border-t-8 border-t-white border-x-8 border-x-transparent border-b-0 rotate-[-135deg]"></div>
                </div>
            </div>
        </>
    )
}

export default MyMessageComponent;