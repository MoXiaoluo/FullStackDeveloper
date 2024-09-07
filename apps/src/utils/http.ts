import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

class Request {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }
  post<T>(url: string, data?: any): Promise<T> {
    return this.instance.post(url, data);
  }
}

export const http = new Request({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

http.instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);
