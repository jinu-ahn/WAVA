import { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const MobileExplorer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="inline-flex">
      <div className="inline items-center justify-between">
        {/* 햄버거 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* 모바일 메뉴 */}
        <Transition
          show={isOpen}
          enter="transition-transform duration-500"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-500"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="rounded z-20 fixed top-0 left-0 mt-0 w-32 bg-white shadow-md p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex w-full justify-end text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-gray-700 hover:text-mainBlue hover:bg-gray-200 rounded"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 text-gray-700 hover:text-mainBlue hover:bg-gray-200 rounded"
                >
                  대시보드
                </Link>
              </li>
              <li>
                <Link
                  to="/channel"
                  className="block py-2 px-4 text-gray-700 hover:text-mainBlue hover:bg-gray-200 rounded"
                >
                  채널
                </Link>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </nav>
  );
};

export default MobileExplorer;
