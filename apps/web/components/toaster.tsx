import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      toastOptions={{
        className: "outline outline-1 outline-black",
        style: {
          borderRadius: 0,
          boxShadow: "0.2rem 0.4rem black",
        },
        position: "bottom-right",
      }}
    />
  );
};

export default CustomToaster;
