import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { userEndpoints } from "./apis";
import type { ApiMethod } from "../types";

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("error in interceptor ", error);
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      originalRequest.url === userEndpoints.REFRESH_TOKENS_API
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(userEndpoints.REFRESH_TOKENS_API, null, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("tokens refreshed");
          if (res.status === 201) {
            console.log("original request send");
            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export const apiconnector = (
  method: ApiMethod,
  url: string,
  bodyData?: any,
  headers?: any,
  params?: any
): Promise<AxiosResponse<any>> => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};