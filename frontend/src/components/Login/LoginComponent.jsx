import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import useDeviceStore from "../../store/deviceStore";

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useDeviceStore((state) => state.isMobile);

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const goToSignup = () => navigate("/signup");

  const userLogin = async () => {
    const user = { email, password };
    const isWorcation = await useUserStore.getState().loginFunc(user);
    if (useUserStore.getState().isLogin) {
      if (!!isWorcation) {
        navigate("/");
      } else {
        navigate("/worcation");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      userLogin();
    }
  };

  return (
    <div
      className={`animate-fade-in-fast  bg-white
      ${
        isMobile
          ? "flex flex-col items-center justify-center min-h-screen max-h-screen w-screen overflow-auto p-4"
          : "grid grid-cols-1 justify-items-center mt-20 mb-20"
      }
    `}
    >
      <div
        className={`
        ${isMobile ? "w-full max-w-[90%] scale-90" : ""}
      `}
      >
        <div
          className={`
          ${
            isMobile
              ? "text-[#1c77c3] text-xl font-bold mb-4"
              : "text-[#1c77c3] text-[20px] font-bold font-['Noto Sans']"
          }
        `}
        >
          로그인 하고
          <br />
          WAVA를 시작해보세요.
        </div>
        <div
          className={`
          ${
            isMobile
              ? "w-full h-px bg-gray-200 my-4"
              : "w-[350px] [h-0px] mt-2 mb-2 border border-gray-200"
          }
        `}
        ></div>
        <div className="w-full max-w-xs">
          <form
            onKeyDown={handleKeyDown}
            className={`
            ${
              isMobile
                ? "space-y-4"
                : "px-8 pt-6 pb-8 w-[350px] border border-[#1c77c3] rounded-lg shadow-lg shadow-blue-500/50"
            }
          `}
          >
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                아이디
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChangeEmail}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder="이메일 입력"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder="비밀번호 입력"
              />
            </div>

            <button
              type="button"
              onClick={userLogin}
              className="w-full h-10 border rounded-[10px] mt-3 mb-1 drop-shadow-md bg-[#1c77c3] text-white"
            >
              로그인
            </button>
            <div className="text-center">
              <span
                className="text-xs text-gray-400 hover:text-blue-500 cursor-pointer"
                onClick={goToSignup}
              >
                회원가입
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
