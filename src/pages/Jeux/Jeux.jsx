import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { QuizzContext } from "../../context/QuizzContext";
import { useContext } from "react";

export default function Jeux() {
  // const { test } = useContext(QuizzContext);
  // console.log(test);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/8">
        <Navbar />
      </div>
      <div className="w-full lg:w-6/8">
        <Outlet />
      </div>
    </div>
  );
}
