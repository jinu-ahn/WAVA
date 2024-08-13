import React from "react";
import GraphView from "./Graph/GraphView";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import useGptStore from "../../store/gptStore";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import mainLogic from "../../util/assistant-logic";
import { ArrowPathIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import useTodoStore from "../../store/todoStore";
import remarkGfm from "remark-gfm";
import TypingEffect from "./TypingEffect";
import Weather from "./Weather";

const DashboardContent = () => {
  const navigate = useNavigate();
  const { worcation } = useUserStore((state) => state.userInfo);

  // 수정 페이지로 이동
  const handleClick = () => {
    navigate("/worcation");
  };

  const [answer, setAnswer] = useState(null);
  const [isComment, setIsComment] = useState(false);

  const { setComments, comment } = useGptStore();

  const ai_test = async () => {
    const comment = await mainLogic();
    setComments(comment);
    setAnswer(comment);
  };

  const [isWorcationInfoOpen, setIsWorcationInfoOpen] = useState(true);

  const toggleDropdown = () => {
    setIsWorcationInfoOpen(!isWorcationInfoOpen);
  };

  // 컴포넌트를 unMount해서 삭제
  const setAIComment = async () => {
    try {
      setIsComment(false);
    } finally {
      await ai_test();
      setIsComment(true);
    }
  };

  return (
    <>
      <div
        className="bg-white text-mainTxt text-center flex flex-col h-full ms-1 me-0.5 mt-1.5"
        style={{ fontFamily: "'IBM Plex Sans KR', sans-serif" }}
      >
        <div className="shadow-md rounded-b-xl rounded-t-md p-2 flex-shrink-0 bg-[#4aa2ee] text-white">
          <div className="px-4 cursor-pointer mt-1" onClick={toggleDropdown}>
            <div className="font-bold text-xl break-keep inline-block mb-2 mt-1">
              나의 워케이션 정보
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                isWorcationInfoOpen ? "max-h-72" : "max-h-0"
              }`}
            >
              <div className="flex gap-2 py-1">
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-full flex items-center">
                    <Weather />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between pl-2">
                  <div className="bg-[#3d5893] p-2 rounded-lg shadow-md flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[#edf1f5] text-sm mb-5">
                        {dayjs(worcation.start).format("YY/MM/DD")}
                        <br /> ~<br />
                        {dayjs(worcation.end).format("YY/MM/DD")}
                      </p>
                      <p className="text-[#edf1f5] text-sm mt-1">
                        {worcation.sido} {worcation.sigungu}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-[#3d5893] py-2 px-3 text-sm font-semibold text-[#edf1f5] shadow-sm transition-colors duration-300 hover:bg-[#18336c] hover:text-white focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                    >
                      워케이션 수정
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {isWorcationInfoOpen && (
              <>
                <p className="text-gray-700 text-base">
                  {dayjs(worcation.start).format("YYYY-MM-DD")}
                  <br /> ~<br />
                  {dayjs(worcation.end).format("YYYY-MM-DD")} <br />
                  {worcation.sido} {worcation.sigungu}
                </p>
                <button
                  className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-300 focus:outline-none mt-3"
                  onClick={handleClick}
                >
                  워케이션 수정
                </button>
              </>
            )} */}
        </div>
        <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-2 me-3 ms-0.5 my-3 bg-[#ffe9ae]">
          <GraphView />
        </div>
        <div className="w-full text-wrap flex-col items-center shadow-md rounded-lg me-3 ms-0.5 mb-1 flex-grow overflow-auto min-h-[200px] break-all">
          <div className="flex justify-between shadow-md sticky top-0 bg-[#4aa2ee]">
            <button
              type="button"
              onClick={setAIComment}
              className="rounded-full drop-shadow-md text-[#ffe9ae]"
            >
              <PlayCircleIcon className="w-8" />
            </button>
            <p className="self-center text-white">WAVA'S AI ASISTANT</p>
            <button
              type="button"
              onClick={setAIComment}
              className="rounded-full drop-shadow-md text-[#ffe9ae]"
            >
              <ArrowPathIcon className="w-8" />
            </button>
          </div>
          {isComment && <TypingEffect text={comment} />}
          <article className="text-pretty p-3 bg-[#dde8ee] h-full">
            <p style={{ fontFamily: "'IBM Plex Sans KR', sans-serif" }}>
              {/* <ReactMarkdown className="" children={answer} remarkPlugins={[remarkGfm]} /> */}
            </p>
          </article>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
