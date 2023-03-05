import React from "react";
import LoginPage from "../pages/LoginPage";
import { useCookies } from "react-cookie";

function AuthMiddleware({ children }) {
  const [cookies] = useCookies(["logged_in"]);
  if (!cookies?.logged_in) return <LoginPage />;
  return children;
}

export default AuthMiddleware;
