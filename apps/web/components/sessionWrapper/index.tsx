"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createSupabaseClientComponent } from "~/lib/supabase/client";
import { useStore } from "~/store";

export const SessionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createSupabaseClientComponent();

  const { onAuthSuccess, onLogout } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLoading(false);
        onAuthSuccess({
          accessToken: session.access_token,
          user: session.user,
        });
      } else {
        return router.replace("/");
      }
    });
  }, []);

  return !loading && children;
};
