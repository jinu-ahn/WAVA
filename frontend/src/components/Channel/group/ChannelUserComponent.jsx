import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export const ChannelUserComponent = ({nickName, profileImg, onClick}) => {
    return (
        <div className="flex flex-col items-center">
            <label onClick={() => onClick(nickName)}>
                {profileImg ? (
                    <img
                    src={profileImg}
                    className="w-10 h-10 mx-auto my-0.5 bg-blue-50 rounded-full border border-black drop-shadow-md"
                    />
                ) : (
                    <UserCircleIcon className="w-12 h-12 mx-auto -my-0.5 rounded-full" />
                )}
            </label>
            {nickName.length > 4
                ? <p className="mt-1 text-xs">{nickName.substring(0, 4) + "..."}</p>
                : <p className="mt-1 text-xs">{nickName.substring(0, 4)}</p>}
        </div>
    );
}