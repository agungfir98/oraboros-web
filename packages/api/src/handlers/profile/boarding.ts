import { UseQueryOptions, useQuery } from "react-query";
import { useApiClient } from "../../providers";
import { ApiFn } from "../../lib/react-query";
import defaultAxios from "axios";

import type { AxiosPromise } from "axios";

export const userBoarding: ApiFn<{}, AxiosPromise<any>> = (
	{},
	{ axios = defaultAxios }
) => {
	return axios.get("/profile/boarding");
};

export const useBoardingQuery = (config: UseQueryOptions) => {
	const { axios } = useApiClient();
	return useQuery({
		queryFn: () => userBoarding({}, { axios }),
		...config,
	});
};
