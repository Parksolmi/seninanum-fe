import { instance } from '../api/instance';

export const login = async (value) => {
  try {
    const response = await instance.post('/auth/login', {
      userId: value,
    });

    const token = response.data.token;

    localStorage.setItem('token', token);
    localStorage.removeItem('userState');

    window.location.href = '/home';
  } catch (err) {
    window.location.href = '/signup/usertype';
    console.log(err);
  }
};
