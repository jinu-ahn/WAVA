import React from "react";
import { FaRegFrown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function NoContent({ createFeedControl, refStatus }) {
  console.log(refStatus);
  const navigate = useNavigate(); // useNavigate 훅을 사용해 navigate 함수를 만듭니다.

  const handleExploreClick = () => {
    navigate("/channel/feed"); // 해당 경로로 이동합니다.
  };

  return (
    <div className="flex flex-col justify-center items-center h-full text-center p-4">
      {/* 아이콘 추가 및 애니메이션 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-gray-400"
      >
        <FaRegFrown size={64} />
      </motion.div>

      {/* 피드가 없다는 메시지 */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-4 text-2xl font-bold text-gray-600"
      >
        앗! 아직 등록한 피드가 없어요!
      </motion.h1>

      {/* 부가 설명 메시지 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="mt-2 text-gray-500"
      >
        피드를 작성하거나 다른 사용자의 피드를 탐색해보세요.
      </motion.p>

      {/* 행동 유도 버튼들 */}
      {refStatus && (
        <motion.button
          onClick={createFeedControl}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600"
        >
          피드 작성하기
        </motion.button>
      )}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md shadow hover:bg-gray-300"
        onClick={handleExploreClick} // 버튼 클릭 시 handleExploreClick 함수가 실행됩니다.
      >
        다른 사용자 탐색하기
      </motion.button>
    </div>
  );
}

export default NoContent;
