import axios from 'axios';
import { instance } from '../api/instance';

export const login = async (value: any) => {
  try {
    const response = await instance.post('/auth/login', {
      userId: value,
    });

    if (response.data.message === 'LOGIN') {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};

export const refresh = async (value: any) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API_URL}/auth/refresh`,
    {
      refreshToken: value.refreshToken,
    }
  );

  const accessToken = response.data.accessToken;
  localStorage.setItem('accessToken', accessToken);
};
