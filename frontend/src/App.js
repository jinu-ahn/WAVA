import React from "react";
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

import ChatPage from "./pages/ChatPage";
import AuthenticatedRouter from "./components/common/AuthenticatedRouter";

function App() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen">
        <Navbar className="m-1" />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/worcation" element={<WorcationPage />} />

            <Route
              path="/dashboard"
              element={
                <AuthenticatedRouter
                  worcation={true}
                  element={<DashboardPage />}
                />
              }
            />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/channel" element={<ChannelPageLayout />}>
              {/* 그룹 시작 */}
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
            {/* </Route> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
