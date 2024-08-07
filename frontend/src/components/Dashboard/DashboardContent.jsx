import React from "react";
import GraphView from "./Graph/GraphView";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";


const DashboardContent = () => {
  const navigate = useNavigate();
  const { worcation } = useUserStore((state) => state.userInfo);

  // 수정 페이지로 이동
  const handleClick = () => {
    navigate("/worcation");
  };
  return (
    <>
      <div className="bg-white text-mainTxt text-center flex flex-col h-full">
        <div className="shadow-md rounded-lg p-2 flex-shrink-0">
          <div className="px-6 py-4">
            <div className="font-bold text-xl break-keep inline-block my-4 mb-2">
              나의 워케이션 정보
            </div>
            <p className="text-gray-700 text-base">
              {dayjs(worcation.start).format("YYYY-MM-DD")} ~<br />
              {dayjs(worcation.end).format("YYYY-MM-DD")} <br />
              {worcation.sido} {worcation.sigungu}
            </p>
          </div>
          <button
            className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
            onClick={handleClick}
          >
            워케이션 수정
          </button>
        </div>

        <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3">
          <GraphView />
        </div>
        <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 flex-grow overflow-auto min-h-[200px]">
          <p>AI 출력 부분</p>
           <button
              type="button"
              onClick={ai_test}
              className="w-full h-10 border rounded-[10px] mt-3 mb-1 drop-shadow-md bg-[#1c77c3] text-white"
            >
              ai 호출
          </button>
          <ReactMarkdown children={answer} />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
