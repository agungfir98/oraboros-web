import React, {
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
} from "react";
import type { AxiosInstance, AxiosPromise } from "axios";
import defaultAxios from "axios";

export type ApiClientContext = {
	axios: AxiosInstance;
	api: <T extends unknown>(axiosPromise: AxiosPromise<T>) => Promise<T>;
};

const ApiClientCtx = createContext<ApiClientContext>({} as any);

export const ApiClientProvider: React.FC<
	PropsWithChildren<{ axiosInstace?: AxiosInstance }>
> = ({ children, axiosInstace }) => {
	const api = useCallback(
		async <T extends unknown>(axiosPromise: AxiosPromise<T>) =>
			await axiosPromise.then(({ data }) => data),
		[]
	);

	const value = {
		axios: axiosInstace || defaultAxios,
		api,
	};
	useEffect(() => {
		console.log({ value });
	}, []);

	return (
		<ApiClientCtx.Provider value={value}>{children}</ApiClientCtx.Provider>
	);
};

export const useApiClient = () => {
	const context = React.useContext(ApiClientCtx);
	if (!context) {
		throw new Error("useApiClient must be used within ApiClientProvider");
	}

	return context;
};
