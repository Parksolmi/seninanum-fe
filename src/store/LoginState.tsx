import { convertCompilerOptionsFromJson } from 'typescript';
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
  const response = await instance.post('/refresh', {
    refreshToken: value.refreshToken,
  });

  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
};
