import React from "react";
import useUserStore from "../../store/userStore";
import { Link } from "react-router-dom";

function LogoutMenu() {
    return (
        <>
            <Link
                to="/dashboard"
                className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
            >
                대시보드
            </Link>
            <Link
                to="/channel"
                className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
            >
                채널
            </Link>
            <Link
                to="/"
                className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
                onClick={useUserStore((state) => state.logoutFunc)}
            >
                로그아웃
            </Link>
        </>
    );
}

export default LogoutMenu;