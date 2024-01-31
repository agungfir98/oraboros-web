import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
	baseURL: `http://localhost:8080`,
	withCredentials: false,
});

export const headers = (token: string): AxiosRequestConfig => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};
