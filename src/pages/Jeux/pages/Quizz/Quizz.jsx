import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Quizz() {
  return (
    <div className="flex flex-col lg:flex-row container">
      <div className="w-full lg:w-2/8">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-6/8">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
