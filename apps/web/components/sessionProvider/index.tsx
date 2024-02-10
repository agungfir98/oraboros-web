"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import { createSupabaseClientComponent } from "~/lib/supabase/client";
import useTokenStore from "~/store/tokenStore";

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const supabase = createSupabaseClientComponent();
  const { setToken } = useTokenStore();

  useQuery({
    async queryFn() {
      return await supabase.auth.getSession();
    },
    onSettled(data) {
      if (data?.data.session) {
        setToken(data.data.session.access_token);
      } else {
        if (location.pathname !== "/") {
          return router.replace("/");
        }
      }
    },
  });

  return <>{children}</>;
};
