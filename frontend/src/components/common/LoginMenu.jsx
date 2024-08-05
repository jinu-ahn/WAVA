import React from "react";
import { Link } from "react-router-dom";

function LoginMenu() {
    return (
        <>
            {/* <Link
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
            </Link> */}
            <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
            >
                로그인
            </Link>
        </>
    );
}

export default LoginMenu;