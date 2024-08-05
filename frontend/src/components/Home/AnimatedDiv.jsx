import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";

const AnimatedDiv = ({ children, animation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 transform ${
        isVisible
          ? `opacity-100 translate-x-0 ${animation}`
          : "opacity-0 -translate-x-full"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedDiv;
