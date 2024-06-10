import axios from 'axios';
// import { refresh } from '../store/auth';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
