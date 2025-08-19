import axios from 'axios';
import interceptCommonRequests from '../middleware/request';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  timeout: 10000, // 10 seconds
});

interceptCommonRequests(axiosInstance);

export default axiosInstance;
