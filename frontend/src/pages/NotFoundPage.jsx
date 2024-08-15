import React, { useEffect } from "react";
import DinoGame from "react-chrome-dino";
import { motion } from "framer-motion";

function NotFoundPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const shakeVariants = {
    visible: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // space 키의 기본 동작(스크롤) 방지
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="items-center min-h-screen">
      <motion.div
        className="text-center mt-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl font-bold"
          variants={shakeVariants}
          animate="visible"
        >
          404 - Page Not Found
        </motion.h1>
        <motion.p className="text-2xl mt-3" variants={containerVariants}>
          Oops! It seems you're lost. Let's play a game!
        </motion.p>
      </motion.div>
      <div className="mt-6">
        <DinoGame />
      </div>
    </div>
  );
}

export default NotFoundPage;
