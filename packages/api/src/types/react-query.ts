import type {
	AxiosError,
	AxiosInstance,
	AxiosPromise,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";
import type {
	UseMutationOptions,
	UseQueryOptions,
	UseQueryResult,
	UseMutationResult,
} from "react-query";

export type ApiFnOptions = {
	axios?: AxiosInstance;
};
export type ApiFn<ParamsType, ResponseType extends AxiosPromise> = (
	params: ParamsType,
	config: ApiFnOptions
) => ResponseType;

export type MutationConfig<MutationFnType extends (...arg: any) => any> =
	UseMutationOptions<
		AxiosResponse<MutationFnType>,
		AxiosError,
		Parameters<MutationFnType>[0]
	>;

export type QueryConfig<tResult = any> = UseQueryOptions<
	AxiosResponse<tResult>
>;

export type QueryFn<
	tResult = any,
	axiosConfig = AxiosRequestConfig | undefined,
> = (
	axiosConfig?: axiosConfig,
	config?: QueryConfig<tResult>
) => UseQueryResult<AxiosResponse<tResult>, any>;

// export type MutationFn<
// 	mutData = any,
// 	mutResult = unknown,
// 	axiosConfig = AxiosRequestConfig | undefined,
// > = (
// 	data: mutData,
// 	axiosConfig: axiosConfig | undefined,
// 	mutationConfig: MutationConfig<mutData>
// ) => UseMutationResult<mutResult>;
