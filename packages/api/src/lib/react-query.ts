import { AxiosInstance, AxiosPromise, ResponseType } from "axios";

export type ApiFnOptions = {
	axios?: AxiosInstance;
};
export type ApiFn<ParamsType, ResponseType extends AxiosPromise> = (
	params: ParamsType,
	config: ApiFnOptions
) => ResponseType;
