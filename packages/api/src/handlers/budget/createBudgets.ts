import { useMutation } from "react-query";
import { CreateBudgetsDTO } from "@ob/dto";
import defaultAxios from "axios";

import type { AxiosPromise } from "axios";
import type { ApiFn, MutationConfig } from "../../types/react-query";
import { useApiClient } from "../../providers";

const createBudgets: ApiFn<Omit<CreateBudgetsDTO, "userId">[], AxiosPromise> = (
	data,
	{ axios = defaultAxios }
) => {
	return axios.post("/budget/newbudgets", data);
};

export const useCreateBudgets = (
	config: MutationConfig<typeof createBudgets>
) => {
	const { axios } = useApiClient();

	return useMutation({
		mutationKey: ["create-budgets"],
		mutationFn: (data: Omit<CreateBudgetsDTO, "userId">[]) => {
			return createBudgets(data, { axios });
		},
		...config,
	});
};
