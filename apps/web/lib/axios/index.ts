import Axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { useStore } from "~/store";

export class AxiosManager {
	public readonly axios: AxiosInstance;

	constructor() {
		this.axios = Axios.create({
			baseURL: "http://localhost:8080",
		});

		this.axios.interceptors.request.use(this.authRequestInterceptor);
	}

	private async authRequestInterceptor(
		axiosConfig: InternalAxiosRequestConfig
	) {
		const token = useStore.getState().accessToken;

		if (axiosConfig.headers) {
			if (token) {
				axiosConfig.headers.authorization = `Bearer ${token}`;
			}
			axiosConfig.headers.Accept = "application/json";
		}

		return axiosConfig;
	}
}

// will be used in SSR API Requests
export const { axios } = new AxiosManager();
