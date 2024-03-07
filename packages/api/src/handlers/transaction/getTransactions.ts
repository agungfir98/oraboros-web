import { useQuery } from "react-query";
import { ApiFn, QueryFn } from "../../types/react-query";
import defaultAxios from "axios";
import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { useApiClient } from "../../providers";

const getTransactions: ApiFn<AxiosRequestConfig | undefined, AxiosPromise> = (
	params,
	{ axios = defaultAxios }
) => {
	return axios.get("/transactions", params);
};

export const useGetTrasactionHistory: QueryFn = (params, config) => {
	const { axios } = useApiClient();
	return useQuery({
		queryFn: () => {
			return getTransactions(params, { axios });
		},
		...config,
	});
};
