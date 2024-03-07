import type { ApiFn, MutationConfig } from "../../types/react-query";
import defaultAxios, { type AxiosPromise } from "axios";
import type { CreateTransactionDTO } from "@ob/dto";
import { useApiClient } from "../../providers";
import { useMutation } from "react-query";

const createTransaction: ApiFn<CreateTransactionDTO, AxiosPromise> = (
	data,
	{ axios = defaultAxios }
) => {
	return axios.post("/transaction/new-transaction", data);
};

export const useCreateTransaction = (
	mutationConfig: MutationConfig<typeof createTransaction>
) => {
	const { axios } = useApiClient();

	return useMutation({
		mutationKey: ["create-transaction"],
		mutationFn(data) {
			return createTransaction(data, { axios });
		},
		...mutationConfig,
	});
};
