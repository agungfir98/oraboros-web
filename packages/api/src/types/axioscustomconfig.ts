import type { AxiosRequestConfig } from "axios";

export type CustomAxiosConfig = Omit<AxiosRequestConfig, "params">;
