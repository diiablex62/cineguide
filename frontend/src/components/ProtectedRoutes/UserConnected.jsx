import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserConnected({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("État de connexion dans UserConnected:", isLoggedIn);

  return isLoggedIn ? children : <Navigate to='/connexion' />;
}
