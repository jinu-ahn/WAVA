import React from "react";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export default function ControllerComponent(props) {

    const changeMode = () => {
        props.setMode(!props.mode);
    }

    return (
        <>
            <div className=" bg-white flex justify-end items-center h-full">
                <button className="rounded-md bg-green-500" onClick={changeMode}>
                    <VideoCameraIcon className="w-10"/>
                </button>
            </div>
        </>
    );
}