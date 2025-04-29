import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserConnected({ children }) {
  const { user, fakeUser, connectedUser } = useContext(AuthContext);
  return user.email !== fakeUser.email || connectedUser ? (
    children
  ) : (
    <Navigate to="/connexion" />
  );
}
