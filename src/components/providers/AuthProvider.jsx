import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AuthProvider({ children }) {
  const defaultUser = {
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    textPerso: "",
    adress: "",
    city: "",
    postalCode: "",
    complement: "",
  };

  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem("session");
    return savedSession ? JSON.parse(savedSession) : defaultUser;
  });

  const [connectedUser, setConnectedUser] = useState(() => {
    return !!localStorage.getItem("session");
  });

  const [fakeUser] = useState({
    email: "default@example.com",
  });

  const saveSession = (data) => {
    localStorage.setItem("session", JSON.stringify(data));
    setUser(data);
  };

  const login = (data) => {
    setUser(data);
    setConnectedUser(true);
    localStorage.setItem("session", JSON.stringify(data));
  };

  const register = (data) => {
    console.log("Register values:", data);
    saveSession(data);
  };

  const logout = () => {
    setUser(defaultUser);
    setConnectedUser(false);
    localStorage.removeItem("session");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, fakeUser, login, logout, register: login, connectedUser }}>
      {children}
    </AuthContext.Provider>
  );
}
