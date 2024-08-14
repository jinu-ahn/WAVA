import { React, useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"

export const MyPin = (props) => {
    const profileImg = props.profileImg;
    return (
        <>
            <label>
                {profileImg ? (
                <img
                    src={profileImg}
                    className="w-10 h-10 mx-auto my-0.5 bg-blue-50 rounded-full border border-black drop-shadow-md cursor-pointer"
                />
                ) : (
                <UserCircleIcon className="w-12 h-12 mx-auto -my-0.5 rounded-full cursor-pointer" />
                )}
            </label>            
        </>
    )
}