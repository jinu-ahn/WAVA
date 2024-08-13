import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useTodoStore from "../../../store/todoStore";
import { useEffect, useState } from "react";
import useCountNum from "./useCountUp";

// 플러그인 정의
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    // console.log(fontSize);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";

    // 상태에서 퍼센트 계산
    const percentage = chart.options.plugins.centerTextPlugin?.percentage || 0;
    const text =
      chart.options.plugins.centerTextPlugin?.eventCnt === 0
        ? "No data"
        : `${percentage}%`;

    // 라벨의 높이를 계산 (차트의 높이에서 라벨을 제외한 영역을 사용)
    const chartArea = chart.chartArea;
    const centerY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;
    const textY = centerY;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    ctx.shadowColor = "rgba(217, 217, 217, 0.7)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin);

function GraphView() {
  const { filteredEvents } = useTodoStore();
  const [finishCnt, setFinishCnt] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const completedCount =
      filteredEvents?.filter((i) => i?.isFinish).length || 0;

    setFinishCnt(completedCount);
    setPercentage(Math.round((completedCount / filteredEvents.length) * 100));
  }, [filteredEvents]);

  const finishData = {
    labels: ["미완료", "완료"],
    datasets: [
      {
        data: [filteredEvents.length - finishCnt, finishCnt],
        backgroundColor: ["rgb(255, 255, 255)", "rgb(28, 119, 195)"],
        borderColor: ["rgb(255, 255, 255)", "rgb(28, 119, 195)"],
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    cutout: "67%",
    // maintainAspectRatio: false,

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      centerTextPlugin: {
        percentage: useCountNum(percentage), // 플러그인에 상태값 전달
        eventCnt: filteredEvents?.length,
      },
    },
  };

  return (
    <div
      className="relative bg-[#ffe9ae]"
      style={{
        maxWidth: "200px",
        height: "100%",
        width: "100%",
      }}
    >
      <Doughnut
        data={finishData}
        options={{
          ...options,
          layout: {
            padding: {
              // top: 20, // 필요한 경우 상단 여백 추가
              bottom: 20, // 필요한 경우 하단 여백 추가
              left: 10, // 필요한 경우 좌측 여백 추가
              right: 10, // 필요한 경우 우측 여백 추가
            },
          },
        }}
        plugins={[centerTextPlugin]} // 플러그인을 이곳에 추가
        // height={"31rem"}
      />
      <div className="mb-1 text-[#18336c]">
        {`완료 : ${finishCnt} 개`} <br />
        {`미완료 : ${filteredEvents.length - finishCnt} 개`} <br />
      </div>
    </div>
  );
}

export default GraphView;
