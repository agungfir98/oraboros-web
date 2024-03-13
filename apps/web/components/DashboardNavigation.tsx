import React from "react";
import SignOutButton from "./Button/SignOutButton";
import Link from "./Link";
import NextLink from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GoGear } from "react-icons/go";
import { Button } from "./ui/button";

const DashboardNavigation = () => {
  return (
    <nav className="container mx-auto flex justify-between py-2">
      <div className="flex items-center justify-center">
        <NextLink href={"/"} className="text-2xl font-extrabold">
          Ob
        </NextLink>
      </div>
      <div className="flex gap-5">
        <Link
          href={"/budget"}
          variant="button"
          outline="1"
          className="rounded-full bg-indigo-300"
        >
          Budgets
        </Link>
        <Link
          href={"/transaction"}
          variant="button"
          outline="1"
          className="rounded-full bg-orange-300"
          prefetch
        >
          Transactions
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              outline="1"
              className="rounded-full shadow-solid-xs"
            >
              <GoGear size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-0 mr-10 p-0 shadow-solid-xs outline outline-1 outline-slate-700">
            <SignOutButton />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default DashboardNavigation;
