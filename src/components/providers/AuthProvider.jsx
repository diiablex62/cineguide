import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: "1",
    firstname: "Jean",
    lastname: "Dupont",
    email: "jean.dupont@gmail.fr",
    avatar: "src/assets/profil/avatar.svg",
    adress: "42 rue de lille",
    city: "Lille",
    postalCode: "59000",
    complement: "Etage 3",
    textPerso: "J’adore les films de Christopher Nolan 😍 ",
  });

  const [autreUser, setAutreUser] = useState({
    id: "2",
    firstname: "Nicole",
    lastname: "Duont",
    email: "nicole.duont@gmail.fr",
    avatar: "src/assets/profil/avatar.svg",
    adress: "4 rue de lille",
    city: "Liller",
    postalCode: "62000",
    complement: "Etage 37",
    textPerso: "et on applaudi Christophe😍 ",
  });

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
    <AuthContext.Provider value={{ user, login, register, logout, autreUser }}>
      {children}
    </AuthContext.Provider>
  );
}
