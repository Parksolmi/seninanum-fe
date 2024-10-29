import { useQuery } from '@tanstack/react-query';
import { instance } from '../api/instance';

interface User {
  userType: string;
  career: number;
}

// 사용자 타입 가져오기
const getUserType = async (): Promise<User> => {
  const res = await instance.get('/user/userType');
  return res.data;
};

export const useFetchUserType = () => {
  return useQuery<User>({
    queryKey: ['userType'],
    queryFn: getUserType,
  });
};
