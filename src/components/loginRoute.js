import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import { loadData } from "./localStorage";

export const LoginRoute = ({ children }) => {
  const token = loadData("token");

  const navigate = useNavigate();
  if (token) {
    return <Navigate to={"/"} />;
  }

  return children;
};
