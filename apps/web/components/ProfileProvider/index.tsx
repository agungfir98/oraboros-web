"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { api, authHeader } from "~/lib/axios";
import useTokenStore from "~/store/tokenStore";

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useTokenStore();

  const { isLoading, data, error } = useQuery({
    queryKey: ["user-db"],
    queryFn: () => {
      return api.get(`/profile/boarding`, {
        headers: {
          ...authHeader(token),
        },
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.status === 201) return redirect("/boarding-page");
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return redirect("/boarding-page");
    }
  }, [data, error]);

  return isLoading ? <div>Loading...</div> : children;
};

export default ProfileProvider;
