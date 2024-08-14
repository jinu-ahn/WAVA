import React from "react";

export default function Tooltip({
  children,
  show,
  position = { top: "70%", left: "0.5rem" },
}) {
  if (!show) return null;

  return (
    <div
      className="absolute bg-gray-800 text-white p-2 rounded-md shadow-md max-w-xs opacity-70 z-50"
      style={{ ...position, marginTop: "-2rem" }} // 툴팁을 위로 올림
    >
      {children}
    </div>
  );
}

// import Tooltip from "./Tooltip"; // 툴팁 임포트

// const [showTooltip, setShowTooltip] = useState(false); // 상태 정의

// html 파트에서 아래부분 복사 후 붙여넣고 사용.
{
  /* <div className="relative">
  <div
    className="cursor-pointer z-10 text-red-900 " // 여기 텍스트 색: 물음표 아이콘 색상
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
  >
    <QuestionMarkCircleIcon />
  </div>
  <Tooltip show={showTooltip}>
    툴팁 내용 입력하세요.
  </Tooltip>
</div>; */
}

// // 워케이션 정보
// 클릭하면 카드가 접힙니다.
// 클릭하면 카드가 열립니다.

// // 그래프
// 필터 버튼을 클릭하면 필터링된 정보의 통계가 출력됩니다.

// // AI파트
// 좌상단 플레이버튼을 클릭하면 WAVA AI 어시스턴트가 일정에 대한 브리핑을 진행합니다.
// 우상단 새로고침 버튼을 클릭하면 브리핑을 새로 진행합니다.
