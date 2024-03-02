"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiClientProvider } from "@ob/api";
import { AxiosManager } from "~/lib/axios";

const axiosManager = new AxiosManager();
const queryClient = new QueryClient();
export const ReactQueryProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<ApiClientProvider axiosInstace={axiosManager.axios}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ApiClientProvider>
	);
};
