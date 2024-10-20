import { useQuery } from 'react-query';
import { instance } from '../api/instance';

interface User {
  userType: string;
  career: number;
}

// 사용자 타입 가져오기
const getUserType = async () => {
  const res = await instance.get('/user/userType');
  return res.data;
};

export const useFetchUserType = () => {
  return useQuery<User>('userTypeKey', getUserType);
};
