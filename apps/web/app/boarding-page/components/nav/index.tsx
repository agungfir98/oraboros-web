"use client";
import React from "react";
import Button from "~/components/Button/default";
import { createSupabaseClientComponent } from "~/lib/supabase/client";

const Navbar = () => {
  const supabase = createSupabaseClientComponent();
  const handleSignOut = () => {
    supabase.auth.signOut().then(() => {
      return location.replace("/");
    });
  };

  return (
    <nav className="h-16 border-b-2 border-black">
      <ul className="flex justify-end h-full">
        <li className="h-full">
          <Button
            variant="danger"
            size="3"
            className="h-full"
            onClick={handleSignOut}
          >
            SignOut
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
