import React from "react";
import { useState, useEffect } from "react";
import { register, checkNicknameAvailability } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useDeviceStore from "../../store/deviceStore";
import { errorMonitor } from "ws";
import SidoSigunguSelector from "../Worcation/SidoSigunguSelector";

function SignupComponent() {
  const navigate = useNavigate();
  const isMobile = useDeviceStore((state) => state.isMobile);

  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nickName, setNickName] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");

  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState("");
  const [isPhone, setIsPhone] = useState("");

  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const [isNickName, setIsNickName] = useState("");

  const [isFormVaild, setIsFormValid] = useState("");

  // useState가 비동기 처리를 하기 때문에 상태가 업데이트된 후에 동작을 하도록 useEffect 사용
  useEffect(() => {
    onChangeFormVaild();
  }, [isEmail, isPassword, isPasswordConfirm, isNickName, isNicknameAvailable]);

  const onChangeFormVaild = () => {
    if (
      isEmail &&
      isPassword &&
      isPasswordConfirm &&
      isNickName &&
      isNicknameAvailable
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailRegEx.test(currentEmail)) {
      setIsEmail(false);
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
      onChangeFormVaild();
    } else {
      setIsEmail(true);
      setEmailMessage("올바른 이메일 형식입니다.");
      onChangeFormVaild();
    }
    onChangeFormVaild();
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^[A-Za-z0-9]{8,20}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setIsPassword(false);
      setPasswordMessage("8~20자 사이의 숫자 + 영문자로 입력해주세요.");
      onChangeFormVaild();
    } else {
      setIsPassword(true);
      setPasswordMessage("안전한 비밀번호 입니다.");
      onChangeFormVaild();
    }
    onChangeFormVaild();
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setIsPasswordConfirm(false);
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      onChangeFormVaild();
    } else {
      setIsPasswordConfirm(true);
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      onChangeFormVaild();
    }
    onChangeFormVaild();
  };

  const onChangeNickName = (e) => {
    const currentNickName = e.target.value;
    console.log("current " + currentNickName);
    setNickName(currentNickName);
    // setIsCheckingNickname(false);
    console.log("after current " + isNickName);
    if (currentNickName.length === 0) {
      setIsNickName(false);
      setNickNameMessage("이름을 입력해주세요.");
      // setIsCheckingNickname(false);
      setIsNicknameAvailable(false);
      console.log("my " + nickName);
      console.log("is " + isNickName);
      console.log("avil " + isNicknameAvailable);
      onChangeFormVaild();
    } else {
      checkNicknameAvailability(
        currentNickName,
        (response) => {
          setIsNickName(true);
          setIsNicknameAvailable(true);
          setNickNameMessage("사용 가능한 닉네임입니다.");
          // setIsCheckingNickname(true);
          onChangeFormVaild();
        },
        (error) => {
          setIsNickName(false);
          setIsNicknameAvailable(false);
          console.log(error);
          setNickNameMessage("중복된 닉네임 입니다.");
          // setIsCheckingNickname(false);
          onChangeFormVaild();
        }
      );
    }
    onChangeFormVaild();
  };

  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    setPhone(currentPhone);
    // const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    // if (!phoneRegExp.test(currentPhone)) {
    //     setPhoneMessage("올바른 형식이 아닙니다!");
    //     setIsPhone(false);
    // } else {
    //     setPhoneMessage("사용 가능한 번호입니다:-)");
    //     setIsPhone(true);
    // }
  };

  const sidoChangeHandle = (e) => {
    if (e === sido) {
      return;
    }
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    setSido(e);
    setSigungu("");
  };

  const sigunguChangeHandle = (e) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    setSigungu(e);
  };

  const userRegister = () => {
    const newUser = {
      email,
      password,
      nickName,
      phone,
      sido,
      sigungu,
    };

    register(
      newUser,
      (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "회원가입이 완료되었습니다!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/login");
      },
      (error) => {
        let text = null;
        if (error.response?.data?.message) {
          text = error.response?.data?.message;
        }
        if (error.response?.data?.error) {
          text = error.response?.data?.error;
        }
        Swal.fire({
          position: "center",
          icon: "error",
          title: "회원가입이 실패하였습니다!",
          text,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      userRegister();
    }
  };

  return (
    <div
      className={`bg-white 
            ${
              isMobile
                ? "flex flex-col items-center justify-center min-h-screen max-h-screen w-screen overflow-auto p-4"
                : "grid grid-cols-1 justify-items-center mt-5 mb-20"
            }
        `}
    >
      <div
        className={`
                ${isMobile ? "w-full max-w-[100%] scale-90" : ""}
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
          회원가입을 위해
          <br />
          정보를 입력해주세요
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
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                아이디 *
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder="이메일 입력"
              />
              <p
                className={`message ${
                  isEmail ? "text-green-600" : "text-red-600"
                } text-xs`}
              >
                {emailMessage}
              </p>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                비밀번호 *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder="비밀번호 입력"
              />
              <p
                className={`message ${
                  isPassword ? "text-green-600" : "text-red-600"
                } text-xs`}
              >
                {passwordMessage}
              </p>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordConfirm"
              >
                비밀번호 확인 *
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder="비밀번호 확인"
              />
              <p
                className={`message ${
                  isPasswordConfirm ? "text-green-600" : "text-red-600"
                } text-xs`}
              >
                {passwordConfirmMessage}
              </p>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                휴대폰 번호 *
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChangePhone}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg"
                placeholder="-는 빼고, 숫자만 입력해 주세요."
              />
              <p
                className={`message ${
                  isPhone ? "text-green-600" : "text-red-600"
                } text-xs`}
              >
                {phoneMessage}
              </p>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nickName"
              >
                WAVA ID *
              </label>
              <input
                id="nickName"
                name="nickName"
                value={nickName}
                onChange={onChangeNickName}
                className="bg-white focus:outline-none ps-3 drop-shadow-md w-full h-10 border border-gray-400 hover:border-[#1c77c3] mb-3 rounded-lg text-xs"
                placeholder="변경할 수 없습니다. 신중하게 작성해 주세요."
              />
              {/* {isCheckingNickname ? (
                <p className="text-blue-600 text-xs">닉네임 확인 중...</p>
              ) : (
                <p
                  className={`message ${
                    isNickName && isNicknameAvailable
                      ? "text-green-600"
                      : "text-red-600"
                  } text-xs`}
                >
                  {nickNameMessage}
                </p>
              )} */}
              <p
                className={`message 
                    ${
                      isNickName && isNicknameAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    } text-xs`}
              >
                {nickNameMessage}
              </p>
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sido"
            >
              선호 워케이션 지역
            </label>
            <SidoSigunguSelector
              sido={sido}
              sigungu={sigungu}
              sidoChangeHandle={sidoChangeHandle}
              sigunguChangeHandle={sigunguChangeHandle}
            />

            <button
              type="button"
              onClick={userRegister}
              disabled={!isFormVaild}
              className={`w-full h-10 border rounded-[10px] mt-3 mb-6 ${
                isFormVaild
                  ? "drop-shadow-md bg-[#1c77c3] text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;
