"use client";
import React from "react";
import { useQuery } from "react-query";
import { api } from "~/lib/axios";
import { createSupabaseClientComponent } from "~/lib/supabase/client";
import useTokenStore from "~/store/tokenStore";

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { setToken } = useTokenStore();
	const supabase = createSupabaseClientComponent();

	const { data, isLoading: dbLoading } = useQuery({
		queryKey: ["user-session"],
		queryFn: () => {
			return supabase.auth.getSession().then((res) => {
				setToken(res.data.session?.access_token!);
				return res.data.session;
			});
		},
	});

	useQuery({
		queryKey: ["user-db"],
		queryFn: () => {
			return api
				.post(`/profile/boarding`, {
					email: data?.user.email,
					displayName: data?.user.user_metadata.full_name,
				})
				.then((res) => {
					console.log({ hehe: res });
					return res;
				});
		},
		refetchOnWindowFocus: false,
		enabled: !dbLoading,
	});

	return dbLoading ? <div>Loading...</div> : children;
};

export default ProfileProvider;
