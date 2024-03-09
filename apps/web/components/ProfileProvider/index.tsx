"use client";
import { useBoardingQuery } from "@ob/api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "~/store";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, setUserId } = useStore();
  const router = useRouter();

  const {
    data,
    isLoading: boardingLoading,
    error,
  } = useBoardingQuery(undefined, {
    retry: false,
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
    onSuccess({ data }) {
      console.log({ data });
      if (data.profile) {
        setUserId(data.profile.userId!);
      }
    },
  });

  useEffect(() => {
    if (!data && isAxiosError(error)) {
      toast.error("something went wrong, try to refresh the page");
    }

    if (boardingLoading) return;

    if (location.pathname === "/boarding-page") {
      if (!data?.data.shouldRedirect) {
        return router.replace("/");
      }
    } else {
      if (data?.data.shouldRedirect) router.replace("/boarding-page");
    }
  }, [data, error, boardingLoading]);

  return !boardingLoading && children;
};

export default ProfileProvider;
