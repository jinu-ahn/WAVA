import { React, useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"

export const MyPin = (props) => {
    const profileImg = props.profileImg;
    return (
        <>
            <div className="w-12 h-12 -translate-y-14">
                <label>
                    {profileImg ? (
                    <img
                        src={profileImg}
                        className="w-10 h-10 -translate-y-0.5 mx-auto my-0.5 bg-blue-50 rounded-full drop-shadow-md cursor-pointer"
                    />
                    ) : (
                    <UserCircleIcon className="w-12 h-12 mx-auto -my-0.5 rounded-full cursor-pointer" />
                    )}
                </label>
            </div>    
        </>
    )
}