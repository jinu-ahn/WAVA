import React, { useEffect, useRef, useState } from "react";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/authStore";
import ChannelPageLayout from "./pages/Channel/ChannelPageLayout";
import GroupChannelPage from "./pages/GroupChannelPage";
import WorcationPage from "./pages/Worcation";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import FeedAroundPage from "./pages/Channel/Feed/FeedAroundPage";
import FeedPersonalPage from "./pages/Channel/Feed/FeedPersonalPage";
import AuthenticatedRouter from "./components/common/AuthenticatedRouter";
import VideoChat from "./components/VideoChat/VideoChat";
import GroupDiscoverPage from "./pages/Channel/Group/GroupDiscoverPage";

function App() {
  const { user } = useAuthStore();
  console.log(user);

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      if (JSON.parse(localStorage.getItem("userStorage"))?.state?.isLogin) {
        localStorage.removeItem("userStorage");
        console.log("세션 만료로 로그아웃되었습니다.");
      }
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="App flex flex-col min-h-screen">
          <Navbar className="m-1" />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/worcation"
                element={<AuthenticatedRouter element={<WorcationPage />} />}
              />
              <Route
                path="/dashboard"
                element={
                  <AuthenticatedRouter
                    worcation={true}
                    element={<DashboardPage />}
                  />
                }
              />

              <Route path="/video-chat" element={<VideoChat />} />

              {/* 중첩 라우팅 */}
              <Route
                path="/channel"
                element={
                  <AuthenticatedRouter element={<ChannelPageLayout />} />
                }
              >
                {/* 그룹 시작 / 그룹 검색, 그룹 방 */}
                <Route
                  path="/channel/group/discover-groups"
                  element={<GroupDiscoverPage />}
                />
                <Route
                  path="/channel/group/:groupId"
                  element={<GroupChannelPage />}
                />
                {/* 그룹 끝 */}

                {/* 피드 시작 / 둘러보기, 개인 피드 */}
                <Route path="/channel/feed" element={<FeedAroundPage />} />
                <Route
                  path="/channel/feed/:userId"
                  element={<FeedPersonalPage />}
                />
                {/* 피드 끝 */}
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
