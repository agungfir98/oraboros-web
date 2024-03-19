import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const MainLoading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <AiOutlineLoading size={50} className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default MainLoading;
