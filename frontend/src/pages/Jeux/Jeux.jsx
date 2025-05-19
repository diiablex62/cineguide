import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Jeux = () => {
  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='flex flex-col lg:flex-row mb-5 lg:justify-between container w-full rounded'>
        <div className='w-full lg:w-2/8 bg-white dark:bg-black mt-5 shadow rounded lg:rounded-l-xl lg:mr-2 text-black dark:text-white'>
          <Navbar></Navbar>
        </div>
        <div className='w-full lg:w-6/8 lg:flex lg:flex-col lg:items-center px-10 bg-white dark:bg-black mt-5 shadow rounded lg:rounded-r-xl h-auto text-black dark:text-white'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Jeux;
