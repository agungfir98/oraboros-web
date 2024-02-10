"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { api, authHeader } from "~/lib/axios";
import { createSupabaseClientComponent } from "~/lib/supabase/client";
import useTokenStore from "~/store/tokenStore";

const Boarding: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setToken, token } = useTokenStore();
  const supabase = createSupabaseClientComponent();

  const { data, isLoading: dbLoading } = useQuery({
    queryKey: ["user-session"],
    async queryFn() {
      const res = await supabase.auth.getSession();
      setToken(res.data.session?.access_token!);
      return res.data.session;
    },
  });

  const {
    isLoading,
    data: dbData,
    error,
  } = useQuery({
    queryKey: ["user-db"],
    queryFn: () => {
      return api.get(`/profile/boarding`, {
        params: {
          email: data?.user.email,
          displayName: data?.user.user_metadata.full_name,
        },
        headers: {
          ...authHeader(token),
        },
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !dbLoading,
  });

  useEffect(() => {
    if (dbData?.status === 201) return redirect("/boarding-page");
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return redirect("/boarding-page");
    }
  }, [dbData, error]);

  return isLoading || dbLoading ? <div>Loading...</div> : children;
};

export default Boarding;
