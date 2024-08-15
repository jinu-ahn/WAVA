import React from "react";
import { FaRegFrown } from "react-icons/fa";
import { motion } from "framer-motion";

const NoResult = ({ onRetry }) => {
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
        앗! 검색 결과가 없어요!
      </motion.h1>

      {/* 부가 설명 메시지 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="mt-2 text-gray-500"
      >
        다른 검색어를 입력해보세요.
      </motion.p>

      {/* 행동 유도 버튼들 */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md shadow hover:bg-gray-300"
        onClick={onRetry}
      >
        다른 검색어 검색하기
      </motion.button>
    </div>
  );
};

export default NoResult;
