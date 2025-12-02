import React from "react";

type dashboardLoaderProps = {
  loading:string
}
const Loader = ({loading}:dashboardLoaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      {/* Circular spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="text-gray-500 text-lg font-medium">{loading}</p>
    </div>
  );
};

export default Loader;