import { useQuery } from "react-query";
import defaultAxios from "axios";
import { useApiClient } from "../../providers";

import type { ApiFn, QueryFn } from "../../types/react-query";
import type { AxiosPromise } from "axios";
import type { Prisma } from "@ob/db";
import type { CustomAxiosConfig } from "../../types/axioscustomconfig";
import type { GetUserBudgetDTO } from "@ob/dto";

type GetUserBudgetResult = {
	sum: number;
	userBudget: Prisma.BudgetGetPayload<{}>[];
};

type GetBudgetConfig = {
	params: GetUserBudgetDTO;
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
