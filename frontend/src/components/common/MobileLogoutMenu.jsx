import React from "react";
import useUserStore from "../../store/userStore";
import { Link } from "react-router-dom";

function MobileLogoutMenu() {
    return (
        <>
            <div className="space-y-2 py-6">
                <Link
                    to="/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-mainTxt hover:bg-gray-50 hover:text-mainBlue"
                >
                    대시보드
                </Link>
                <Link
                    to="/channel"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-mainTxt hover:bg-gray-50 hover:text-mainBlue"
                >
                    채널
                </Link>
            </div>
            <div className="py-1">
                <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-mainTxt hover:bg-gray-50 hover:text-mainBlue"
                    onClick={useUserStore((state) => state.logoutFunc)}
                >
                    로그아웃
                </Link>
            </div>
        </>
    );
}

export default MobileLogoutMenu;