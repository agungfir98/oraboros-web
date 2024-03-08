import { useQuery } from "react-query";
import { useApiClient } from "../../providers";
import defaultAxios from "axios";

import type { ApiFn, QueryFn } from "../../types/react-query";
import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

export const userBoarding: ApiFn<
	AxiosRequestConfig | undefined,
	AxiosPromise
> = (axiosConfig, { axios = defaultAxios }) => {
	return axios.get("/profile/boarding", axiosConfig);
};

export const useBoardingQuery: QueryFn<{
	shouldRedirect: boolean;
	profile: { userId: string };
}> = (params = undefined, config) => {
	const { axios } = useApiClient();
	return useQuery({
		queryFn: () => userBoarding(params, { axios }),
		...config,
	});
};
