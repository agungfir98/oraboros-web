"use client";
import React from "react";
import { GoGear } from "react-icons/go";
import SignOutButton from "~/components/Button/SignOutButton";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const Navbar = () => {
  return (
    <nav className="container mx-auto flex h-16 items-center justify-end">
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
    </nav>
  );
};

export default Navbar;
