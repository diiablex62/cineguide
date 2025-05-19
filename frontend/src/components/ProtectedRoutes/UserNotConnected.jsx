import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserNotConnected({ children }) {
  const context = useContext(AuthContext);

  if (!context) return children;

  const { user, connectedUser } = context;
  return !user || !connectedUser ? children : <Navigate to='/' />;
}
