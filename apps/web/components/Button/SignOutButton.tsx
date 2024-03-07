"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import Button from "./default";
import { createSupabaseClientComponent } from "~/lib/supabase/client";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton = () => {
  const supabase = createSupabaseClientComponent();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    return supabase.auth.signOut().then(() => {
      setIsLoading(false);
      location.replace("/");
    });
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-neutral-400/30" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 self-center bg-white px-5 py-4 shadow-solid-sm outline outline-1 outline-slate-700 max-sm:w-[90%]">
          <div>
            <h1 className="font-medium text-red-500">
              You are about to be Sign Out.
            </h1>
            <p>are you sure?</p>
          </div>
          <div className="mt-4 flex justify-end gap-5">
            <AlertDialog.Cancel asChild>
              <Button
                className="shadow-solid-sm"
                variant="primary"
                size="2"
                outline="1"
              >
                Cancel {"[esc]"}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                className="shadow-solid-sm"
                variant="danger"
                size="2"
                outline="1"
                isLoading={isLoading}
                onClick={handleSignOut}
              >
                Log out
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
      <AlertDialog.Trigger asChild>
        <Button variant="danger" outline="1" size="3" className="px-6">
          <FaSignOutAlt />
        </Button>
      </AlertDialog.Trigger>
    </AlertDialog.Root>
  );
};

export default SignOutButton;
