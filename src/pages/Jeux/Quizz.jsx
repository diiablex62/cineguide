import React from "react";
<<<<<<<< HEAD:src/pages/Jeux/pages/Quizz/Quizz.jsx
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
========
import Navbar from "./components/Navbar";
>>>>>>>> 6584b8beac1abaaebde7760b09fae7acffea44d5:src/pages/Jeux/Quizz.jsx

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
