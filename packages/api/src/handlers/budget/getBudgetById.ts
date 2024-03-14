import { useQuery } from "react-query";
import defaultAxios from "axios";
import { useApiClient } from "../../providers";

import type { ApiFn, QueryFn } from "../../types/react-query";
import type { AxiosPromise } from "axios";
import type { CustomAxiosConfig } from "../../types/axioscustomconfig";
import type { GetBudgetByIdDTO } from "@ob/dto";
import type { Prisma } from "@ob/db";

type AxiosConfig = {
	params: GetBudgetByIdDTO;
} & CustomAxiosConfig;

const getBudgetById: ApiFn<AxiosConfig | undefined, AxiosPromise> = (
	axiosConfig,
	{ axios = defaultAxios }
) => {
	const { budgetId } = axiosConfig?.params!;

	return axios.get(`/budget/${budgetId}`);
};

export const useGetBudgetById: QueryFn<
	Prisma.BudgetGetPayload<{ include: { orders: true } }>,
	AxiosConfig
> = (axiosConfig = undefined, config) => {
	const { axios } = useApiClient();
	return useQuery({
		queryFn() {
			return getBudgetById(axiosConfig, { axios });
		},
		...config,
	});
};
