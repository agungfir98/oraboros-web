import { useQuery } from "react-query";
import { ApiFn, QueryFn } from "../../types/react-query";
import defaultAxios from "axios";
import type { AxiosPromise } from "axios";
import { useApiClient } from "../../providers";
import { CustomAxiosConfig } from "../../types/axioscustomconfig";
import { Prisma } from "@ob/db";
import { GetTransactionDTO } from "@ob/dto";

type CustomConfig = {
	params: GetTransactionDTO;
} & CustomAxiosConfig;

type GetTransactionResult = {
	count: number;
	status: string;
	userTransactions: Prisma.TransactionsGetPayload<{
		include: { _count: true; order: true };
	}>[];
};

const getTransactions: ApiFn<CustomConfig | undefined, AxiosPromise> = (
	axiosConfig,
	{ axios = defaultAxios }
) => {
	return axios.get("/transaction", axiosConfig);
};

export const useGetTransactions: QueryFn<GetTransactionResult, CustomConfig> = (
	axiosConfig = undefined,
	config
) => {
	const { axios, api } = useApiClient();
	return useQuery({
		queryFn: () => {
			return getTransactions(axiosConfig, { axios });
		},
		...config,
	});
};
