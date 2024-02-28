import { useQuery } from "react-query";
import defaultAxios from "axios";

import type { ApiFn } from "../../lib/react-query";
import type { AxiosPromise } from "axios";
import { useApiClient } from "../../providers";

const getUserBudget: ApiFn<{ userId: string }, AxiosPromise<any>> = (
	{ userId },
	{ axios = defaultAxios }
) => {
	return axios.get("/budget", {
		params: {
			userId,
		},
	});
};
export const useUserBudget = ({ userId }: { userId: string }) => {
	const { axios } = useApiClient();

	return useQuery({
		queryFn: () => {
			return getUserBudget({ userId }, { axios });
		},
	});
};
