import { axiosInstance } from './axiosInstance';

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API ERROR:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);
