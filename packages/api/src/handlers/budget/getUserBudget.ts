import { useQuery } from "react-query";
import defaultAxios from "axios";
import { useApiClient } from "../../providers";

import type { ApiFn, QueryFn } from "../../types/react-query";
import type { AxiosPromise, AxiosRequestConfig } from "axios";
import type { UserBudgetDTO } from "@ob/dto";
import { CustomAxiosConfig } from "../../types/axioscustomconfig";

type GetUserBudgetResult = {
	sum?: number;
	userBudget: UserBudgetDTO[];
};

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
export const useGetUserBudget: QueryFn<GetUserBudgetResult, GetBudgetConfig> = (
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
