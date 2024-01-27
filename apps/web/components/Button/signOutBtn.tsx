"use client";
import { Button } from "@radix-ui/themes";
import React from "react";
import { createSupabaseClientComponent } from "~/lib/supabase/client";

const SignOutBtn = () => {
  const supabase = createSupabaseClientComponent();

  const handleSignOut = () => {
    return supabase.auth.signOut().then(() => location.reload());
  };

  return (
    <Button color="crimson" radius="medium" onClick={handleSignOut}>
      logout
    </Button>
  );
};

export default SignOutBtn;
