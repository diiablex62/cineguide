import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserConnected({ children }) {
  const { user, connectedUser } = useContext(AuthContext);

  // Vérification simplifiée : utilisateur existe et est connecté
  const isConnected = user && connectedUser;

  return isConnected ? children : <Navigate to='/connexion' />;
}
