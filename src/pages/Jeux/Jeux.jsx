import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Jeux() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      Jeux
    </div>
  );
}
