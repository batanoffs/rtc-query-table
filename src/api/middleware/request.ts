import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Request interceptor function
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  console.log(`[REQUEST] [${config.method?.toUpperCase()}] ${config.url}`);
  return config;
};

// Request error handler
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[REQUEST ERROR] ${error}`);
  return Promise.reject(error);
};

export default function interceptCommonRequests(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
}
