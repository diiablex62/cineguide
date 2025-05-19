import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-white dark:bg-black'>
      <div className='flex flex-col items-center'>
        <div className='w-16 h-16 border-4 border-fuchsia border-t-transparent rounded-full animate-spin'></div>
        <p className='mt-4 text-gray-700 dark:text-gray-300 text-xl'>
          Chargement en cours...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
