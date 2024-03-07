import React from "react";
import SignOutButton from "./Button/SignOutButton";
import Link from "./Link";
import NextLink from "next/link";

const DashboardNavigation = () => {
  return (
    <div className="relative">
      <nav className="flex h-10 justify-between gap-0 text-sm outline outline-1 outline-black md:h-16 md:text-base">
        <div className="flex items-center justify-center px-10">
          <NextLink href={"/"} className="text-2xl font-extrabold">
            Ob
          </NextLink>
        </div>
        <div className="flex gap-[1px]">
          <Link href={"/budget"} outline="1" className="px-3">
            Budgets
          </Link>
          <Link href={"/transaction"} outline="1" className="px-3" prefetch>
            Transactions
          </Link>
          <SignOutButton />
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavigation;
