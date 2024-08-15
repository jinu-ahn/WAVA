import React, { useEffect, useState } from "react";
import "./TypingEffect.css";
const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // index를 상태로 관리

  useEffect(() => {
    if (!text) {
      setDisplayedText(""); // 텍스트가 없으면 빈 문자열을 표시
      setIsCompleted(true); // 즉시 완료 상태로 설정
      return;
    }

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= text.length) {
          clearInterval(interval);
          setIsCompleted(true);
          return prevIndex;
        }
        return newIndex;
      });
    }, 100); // 한 글자마다 100ms의 지연

    return () => clearInterval(interval);
  }, [text, currentIndex]);

  return (
    <div
      className={`text-lg p-2 font-mono typing-effect bg-[#dde8ee] text-[#18336c] ${
        isCompleted ? "completed" : ""
      }`}
    >
      {displayedText}
    </div>
  );
};

export default TypingEffect;
