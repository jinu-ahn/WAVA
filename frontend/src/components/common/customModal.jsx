import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const CustomModal = ({ isOpen, children, onClose, styles }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0  bg-gray-600 bg-opacity-50 flex justify-center items-center z-10 transform transition-transform duration-300 ${styles}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg relative ${
          isMobile
            ? "w-11/12 max-w-md p-2 max-h-[80vh] overflow-y-auto"
            : "w-full max-w-md p-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default CustomModal;
