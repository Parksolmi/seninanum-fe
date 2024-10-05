import { instance } from '../api/instance';
import { useQuery } from 'react-query';

// User 인터페이스 정의
interface User {
  nickname: string;
  gender: '여성' | '남성';
  birthYear: string;
  profile: string;
}

const getProfile = async () => {
  const res = await instance.get<User>(`/user/profile`);
  return res.data;
};

export const useFetchProfile = () => {
  return useQuery<User>('fetchProfileKey', getProfile);
};
