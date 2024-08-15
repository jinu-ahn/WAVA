import React, { useEffect, useState } from "react";
import { FaGithub, FaGitlab } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const [hiddenFooter, setHiddenFooter] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.match("/dashboard") ||
      location.pathname.match("/channel")
    ) {
      setHiddenFooter(true);
    } else {
      setHiddenFooter(false);
    }
  }, [location]);

  if (hiddenFooter) return null;

  const iconsTab = [
    {
      icon: <FaGithub />,
      url: "https://github.com/MJ-Kor",
      name: "김민주",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/wjswlgnsdlqslek",
      name: "전지훈",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/DDARK00",
      name: "한세훈",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/jinu-ahn",
      name: "안진우",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/byeongsuLEE",
      name: "이병수",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/S-Choi-1997",
      name: "최승호",
    },
    {
      icon: <FaGitlab />,
      url: "https://lab.ssafy.com/s11-webmobile1-sub2/S11P12C204",
      name: "C204",
    },
  ];

  const menuItems = [
    { text: "홈", path: "/" },
    { text: "대시보드", path: "/dashboard" },
    { text: "채널", path: "/channel" },
  ];

  return (
    <footer
      className="bg-white mt-auto hidden md:block"
      style={{ fontFamily: "'IBM Plex Sans KR', sans-serif" }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-start">
        {/* 로고 및 아이콘 섹션 */}
        <div className="flex flex-col w-1/3 gap-4">
          <img src="/wavalogo.png" alt="footer_logo" className="w-24" />
          <div className="flex gap-2 text-mainTxt flex-wrap">
            {iconsTab.map(({ icon, url, name }, index) => (
              <div key={index} className="flex flex-col items-center">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg bg-gray-200 p-1.5 rounded-full hover:bg-mainBlue hover:text-white transition-all duration-300 cursor-pointer mb-1"
                >
                  {icon}
                </a>
                <span className="text-xs text-mainTxt">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-mainTxt">© C204 WAVA</p>
        </div>

        {/* 메뉴 및 팀 섹션 */}
        <div className="flex gap-10 w-2/3 justify-end">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">Menu</p>
            <span className="block w-16 h-0.5 bg-mainBlue"></span>
            {menuItems.map(({ text, path }, index) => (
              <Link
                key={index}
                to={path}
                className="text-sm text-mainTxt hover:text-subBlue cursor-pointer"
              >
                {text}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">Team</p>
            <span className="block w-40 h-0.5 bg-mainBlue"></span>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="text-sm text-mainTxt font-bold">Front-end:</p>
                {["김민주", "전지훈", "한세훈"].map((name, index) => (
                  <p key={index} className="text-xs text-mainTxt">
                    {name}
                  </p>
                ))}
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-mainTxt font-bold">Back-end:</p>
                {["안진우", "이병수", "최승호"].map((name, index) => (
                  <p key={index} className="text-xs text-mainTxt">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
