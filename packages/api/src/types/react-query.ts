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
} from "react-query";

export type ApiFnOptions = {
	axios?: AxiosInstance;
};
export type ApiFn<ParamsType, ResponseType extends AxiosPromise> = (
	params: ParamsType,
	config: ApiFnOptions
) => ResponseType;

export type MutationConfig<MutationFnType extends (...arg: any) => any> =
	UseMutationOptions<AxiosResponse, AxiosError, Parameters<MutationFnType>[0]>;

export type QueryConfig<tResult = any> = UseQueryOptions<
	AxiosResponse<tResult>
>;

export type QueryFn<tResult = any> = (
	params?: AxiosRequestConfig | undefined,
	config?: QueryConfig<tResult>
) => UseQueryResult<AxiosResponse<tResult>, any>;
