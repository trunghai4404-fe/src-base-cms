import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/Cookies';
import Cookies from 'js-cookie';

export const cookies = {
    setAccessToken(token: string) {
        Cookies.set(ACCESS_TOKEN, token);
    },

    getAccessToken() {
        return Cookies.get(ACCESS_TOKEN);
    },

    removeAccessToken() {
        Cookies.remove(ACCESS_TOKEN);
    },

    setRefreshToken(token: string) {
        Cookies.set(REFRESH_TOKEN, token);
    },

    getRefreshToken() {
        return Cookies.get(REFRESH_TOKEN);
    },

    removeRefreshToken() {
        Cookies.remove(REFRESH_TOKEN);
    },

    clearAuth() {
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(REFRESH_TOKEN);
    },
};