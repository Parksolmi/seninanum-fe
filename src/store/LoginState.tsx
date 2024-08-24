import { instance } from '../api/instance';

export const login = async (value) => {
  try {
    const response = await instance.post('/auth/login', {
      userId: value,
    });

    if (response.data.message === 'LOGIN') {
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};
