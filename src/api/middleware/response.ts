import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Response interceptor function
const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log(`[RESPONSE] [${response.status}] ${response.config.url}`);
  return response;
};

// Response error handler
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    console.error(`[RESPONSE ERROR] Status: ${error.response.status}`);
    console.error('Error Data:', error.response.data);
    console.error('Error Headers:', error.response.headers);
  } else if (error.request) {
    console.error('[RESPONSE ERROR] No response received:', error.request);
  } else {
    console.error('[RESPONSE ERROR] Error in request setup:', error.message);
  }
  return Promise.reject(error);
};

export default function interceptCommonRequests(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
}
