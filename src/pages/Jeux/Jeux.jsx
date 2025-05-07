import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Jeux() {
  return (
    <div className="flex flex-col lg:flex-row mb-5 lg:justify-between container w-full rounded min-h-screen  bg-gray-300 rounded-l p-5">
      <div className="w-full lg:w-2/8 bg-white mt-5  shadow rounded lg:rounded-l-xl lg:mr-2">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-6/8 lg:flex lg:flex-col  lg:items-center px-10 bg-white mt-5 shadow rounded lg:rounded-r-xl h-auto">
        <Outlet />
      </div>
    </div>
  );
}
