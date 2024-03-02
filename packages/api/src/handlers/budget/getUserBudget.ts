import { useQuery } from "react-query";
import defaultAxios from "axios";

import type { ApiFn, QueryFn } from "../../types/react-query";
import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { useApiClient } from "../../providers";

type CustomAxiosConfig = Omit<AxiosRequestConfig, "params">;

type GetBudgetConfig = {
	params: {
		sum: boolean;
	};
} & CustomAxiosConfig;

const getUserBudget: ApiFn<GetBudgetConfig | undefined, AxiosPromise> = (
	axiosConfig,
	{ axios = defaultAxios }
) => {
	return axios.get("/budget/user-budget", axiosConfig);
};

/**
 *
 * @param axiosConfig contains sum property to sum up budget of the user
 * @param config
 * @returns
 */
export const useGetUserBudget: QueryFn<any, GetBudgetConfig> = (
	axiosConfig = undefined,
	config
) => {
	const { axios } = useApiClient();

	return useQuery({
		queryKey: ["user-budget"],
		queryFn: () => {
			return getUserBudget(axiosConfig, { axios });
		},
		...config,
	});
};
