import axios from 'axios';
import { refresh } from '../store/LoginState';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data.message;

    // accessToken 만료
    if (status === 403 && message === 'JWT has expired') {
      // refreshToken으로 accessToken 갱신
      await refresh({
        refreshToken: localStorage.getItem('refreshToken'),
      }).catch((error) => {
        // refreshToken이 만료되었을 때
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요!');
        window.location.href = '/';
        return Promise.reject(error);
      });

      const accessToken = localStorage.getItem('accessToken');
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);
