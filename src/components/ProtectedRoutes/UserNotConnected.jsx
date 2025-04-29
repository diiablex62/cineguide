import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserNotConnected({ children }) {
  const { user, connectedUser } = useContext(AuthContext);
  return !user || !connectedUser ? children : <Navigate to="/" />;
}
