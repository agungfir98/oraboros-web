import { useQuery } from "react-query";
import { ApiFn } from "../../lib/react-query";
import defaultAxios from "axios";
import type { AxiosPromise } from "axios";
import { useApiClient } from "../../providers";
import type { GetUserTransactionDTO } from "@ob/dto";

const getTransactions: ApiFn<GetUserTransactionDTO, AxiosPromise<any>> = (
	{ userId },
	{ axios = defaultAxios }
) => {
	return axios.get("/transactions", {
		params: {
			userId,
		},
	});
};

export const useGetTrasactionHistory = ({ userId }: GetUserTransactionDTO) => {
	const { axios } = useApiClient();
	return useQuery({
		queryFn: () => {
			return getTransactions({ userId }, { axios });
		},
	});
};
