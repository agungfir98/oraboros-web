import { useQuery } from "react-query";
import { ApiFn, QueryFn } from "../../types/react-query";
import defaultAxios from "axios";
import type { AxiosPromise } from "axios";
import { useApiClient } from "../../providers";
import { CustomAxiosConfig } from "../../types/axioscustomconfig";
import { GetUserTransactionDTO } from "@ob/dto";

type CustomConfig = {
	params: {
		userId: string;
	};
} & CustomAxiosConfig;

type GetTransactionResult = {
	count: number;
	status: string;
	userTransactions: GetUserTransactionDTO[];
};

const getTransactions: ApiFn<CustomConfig | undefined, AxiosPromise> = (
	axiosConfig,
	{ axios = defaultAxios }
) => {
	return axios.get("/transaction", axiosConfig);
};

export const useGetTrasactionHistory: QueryFn<
	GetTransactionResult,
	CustomConfig
> = (axiosConfig = undefined, config) => {
	const { axios } = useApiClient();
	return useQuery({
		queryFn: () => {
			return getTransactions(axiosConfig, { axios });
		},
		...config,
	});
};
