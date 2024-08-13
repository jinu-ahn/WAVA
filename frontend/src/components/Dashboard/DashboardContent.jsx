import React from "react";
import GraphView from "./Graph/GraphView";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import useGptStore from "../../store/gptStore";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import mainLogic from "../../util/assistant-logic";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "lucide-react";
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

  const [isWorcationInfoOpen, setIsWorcationInfoOpen] = useState(false);

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
        className="bg-white text-mainTxt text-center flex flex-col h-full"
        style={{ fontFamily: "'IBM Plex Sans KR', sans-serif" }}
      >
        <div className="shadow-md rounded-lg p-2 flex-shrink-0 bg-slate-100">
          <div className="px-6 cursor-pointer mt-2" onClick={toggleDropdown}>
            <div className="font-bold text-xl break-keep inline-block my-1 mt-1">
              나의 워케이션 정보
            </div>
            <Weather />
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                isWorcationInfoOpen ? "max-h-96" : "max-h-0"
              }`}
            >
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
        </div>
        <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-2 me-3 ms-0.5 my-3">
          <GraphView />
        </div>
        <div className="w-full text-wrap flex-col items-center shadow-md rounded-lg me-3 ms-0.5 mb-1 flex-grow overflow-auto min-h-[200px] break-all">
          <div className="flex justify-between shadow-md sticky top-0 bg-sky-100">
            <button
              type="button"
              onClick={setAIComment}
              className="border rounded-lg drop-shadow-md text-black"
            >
              <CalendarDaysIcon className="w-8" />
            </button>
            <p className="self-center">WAVA'S AI ASISTANT</p>
            <button
              type="button"
              onClick={setAIComment}
              className="border rounded-lg drop-shadow-md text-black"
            >
              <ArrowPathRoundedSquareIcon className="w-8" />
            </button>
          </div>
          {isComment && <TypingEffect text={comment} />}
          <article className="text-pretty p-3">
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
