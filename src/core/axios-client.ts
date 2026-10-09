import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { BAKERY_ACCESS_TOKEN } from '@/config/Cookies';
import { ApiError } from './api-error';

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = Cookies.get(BAKERY_ACCESS_TOKEN);

        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (!(config.data instanceof FormData) && config.headers) {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<any>) => {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 401) {
                Cookies.remove(BAKERY_ACCESS_TOKEN);
            }

            const errorMessage = data?.message || data?.title || 'Đã có lỗi xảy ra từ máy chủ';
            const errorCode = data?.code;
            const validationErrors = data?.errors;

            return Promise.reject(new ApiError(errorMessage, status, errorCode, validationErrors));
        }

        if (error.request) {
            return Promise.reject(new ApiError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.', 0));
        }

        return Promise.reject(new ApiError(error.message || 'Lỗi không xác định'));
    },
);

export default axiosClient;
