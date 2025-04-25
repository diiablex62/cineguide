import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const saveSession = (data) => {
    localStorage.setItem("session", JSON.stringify(data));
    setUser(data);
  };

  const login = (data) => {
    console.log("Login values:", data);
    saveSession(data);
  };

  const register = (data) => {
    console.log("Register values:", data);
    saveSession(data);
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
