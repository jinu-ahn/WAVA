import React, { useEffect } from "react";
import useUserStore from "../../store/userStore";
import { Navigate, useNavigate } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";

// PrivateRoute component to protect routes
// 로그인 여부에 따라서 로그인으로 안내하는 라우터
const AuthenticatedRouter = ({ element, worcation }) => {
  const isLogin = useUserStore((state) => state.isLogin);
  const isWorcation = useUserStore((state) => state.userInfo?.worcation);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
    } else if (isLogin && !isWorcation && worcation) {
      navigate("/worcation", { replace: true });
    }
  }, [isLogin, isWorcation, worcation, navigate]);

  if (isLogin && (isWorcation || !worcation)) {
    return element;
  }

  return null;
};

export default AuthenticatedRouter;
