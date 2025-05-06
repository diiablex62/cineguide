import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import toast, { Toaster } from "react-hot-toast";
import Etape1 from "./pages/affiche/etape1";
import { AfficheContext } from "../../context/AfficheContext";
import Etape2 from "./pages/affiche/Etape2";
import Etape3 from "./pages/affiche/Etape3";
export default function Affiche() {
  const { stepGame } = useContext(AfficheContext);
  return (
    <div className="flex flex-col lg:flex-row mb-5 lg:justify-between container w-full rounded min-h-screen  bg-gray-300 rounded-l p-5">
      <Toaster></Toaster>
      <div className="w-full lg:w-2/8 bg-white mt-5  shadow rounded lg:rounded-l-xl lg:mr-2">
        <Navbar></Navbar>
      </div>
      {stepGame == 1 ? (
        <Etape1></Etape1>
      ) : stepGame == 2 ? (
        <Etape2></Etape2>
      ) : stepGame == 3 ? (
        <Etape3></Etape3>
      ) : (
        ""
      )}
    </div>
  );
}
