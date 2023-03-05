import React from "react";
import LoginPage from "../pages/LoginPage";

function AuthMiddleware({ children }) {
  const user = LoggedUserData();

  if (!user) return <LoginPage />;

  return children;
}

function LoggedUserData() {
  const userData = localStorage.getItem("todoLoggedUser");
  if (userData) return JSON.parse(userData);
  return null;
}
export default AuthMiddleware;
