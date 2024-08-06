import React from "react";
import useUserStore from "../../store/userStore";
import { Navigate } from "react-router-dom";

// PrivateRoute component to protect routes
// 로그인 여부에 따라서 로그인으로 안내하는 라우터
const AuthenticatedRouter = ({ element, worcation, ...rest }) => {
  const isLogin = useUserStore((state) => state.isLogin);
  const isWorcation = useUserStore((state) => state.userInfo?.worcation);
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  if (isLogin && worcation) {
    return <Navigate to="/worcation" />;
  }
  return element;
};

export default AuthenticatedRouter;
