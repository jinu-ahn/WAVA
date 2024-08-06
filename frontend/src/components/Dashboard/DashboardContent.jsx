// import React, { useState } from "react";
// import GraphView from "./Graph/GraphView";

// const DashboardContent = ({ calendarChange }) => {
//   const [category, setCategory] = useState("WORQ"); // 카테고리 WORQ, important

//   const categoryChangeHandle = (evt) => {
//     // 이분법
//     // true면 important, false면 WORK/VACATION
//     console.log(evt.target.value);
//     setCategory((state) => (state === "WORQ" ? "important" : "WORQ"));
//   };
//   return (
//     <>
//       <div className="bg-white text-mainTxt text-center flex flex-col h-full">
//         {/* <button onClick={() => calendarChange("dayGridMonth")}>asdf</button> */}
//         {/* dayGridMonth,timeGridWeek,threeDays,timeGridDay */}
//         <div className="shadow-md rounded-lg p-2 flex-shrink-0">
//           <span className="text-xl inline-block my-4">나의 워케이션 정보</span>
//           <p>여기다가 내 워케이션 정보 카드 보여주면 될 듯 ㅇㅇ</p>
//         </div>

//         <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3">
//           <GraphView category={category} />
//         </div>
//         <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 overflow-auto min-h-[50px]">
//           <h4>필터 옵션</h4>
//         </div>
//         <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 flex-grow overflow-auto min-h-[200px]">
//           <p>AI 출력 부분</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardContent;

import React, { useState } from "react";
import GraphView from "./Graph/GraphView";
import Filters from "./Calendar/Filters";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";

const DashboardContent = ({ calendarChange }) => {
  const [filter, setFilter] = useState({ type: "ALL", important: "ALL" });
  const [category, setCategory] = useState("WORQ"); // 카테고리 WORQ, important
  const navigate = useNavigate();

  const categoryChangeHandle = (evt) => {
    // 이분법
    // true면 important, false면 WORK/VACATION
    setCategory((state) => (state === "WORQ" ? "important" : "WORQ"));
  };

  // 수정 페이지로 이동
  const handleClick = () => {
    navigate("/worcation");
  };
  return (
    <>
      <div className="bg-white text-mainTxt text-center flex flex-col h-full">
        {/* <button onClick={() => calendarChange("dayGridMonth")}>asdf</button> */}
        {/* dayGridMonth,timeGridWeek,threeDays,timeGridDay */}
        <div className="shadow-md rounded-lg p-2 flex-shrink-0">
          <span className="text-xl inline-block my-4">나의 워케이션 정보</span>
          <p>여기다가 내 워케이션 정보 카드 보여주면 될 듯 ㅇㅇ</p>
          <button
            className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
            onClick={handleClick}
          >
            워케이션 수정
          </button>
        </div>

        <div className="w-full flex-shrink-0 flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3">
          <GraphView category={category} />
        </div>
        <div className="w-full flex flex-col items-center shadow-md rounded-lg py-5 me-3 ms-1 my-3 flex-grow overflow-auto min-h-[200px]">
          <p>AI 출력 부분</p>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
