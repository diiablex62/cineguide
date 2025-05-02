import React from "react";
import Navbar from "../components/Navbar";

export default function Quizz() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/8">
          <Navbar></Navbar>
        </div>
        <div className="w-full lg:w-6/8">quizz</div>
      </div>
    </div>
  );
}
