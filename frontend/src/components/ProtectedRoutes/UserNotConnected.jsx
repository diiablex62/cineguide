import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserNotConnected({ children }) {
  const context = useContext(AuthContext);

  if (!context) return children;

  const { isLoggedIn } = context;
  console.log("État de connexion dans UserNotConnected:", isLoggedIn);

  return !isLoggedIn ? children : <Navigate to='/' />;
}
