import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: `http://localhost:8080`,
  withCredentials: false,
});

export const authHeader = (token: string): AxiosRequestConfig["headers"] => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
