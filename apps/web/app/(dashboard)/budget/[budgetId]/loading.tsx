import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const BudgetLoading = () => {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <AiOutlineLoading size={40} className="animate-spin" />
    </div>
  );
};

export default BudgetLoading;
