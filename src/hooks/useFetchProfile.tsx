import { instance } from '../api/instance';
import { useQuery } from '@tanstack/react-query';

// User 인터페이스 정의
interface User {
  nickname: string;
  gender: '여성' | '남성';
  birthYear: string;
  profile: string;
}

// 내 프로필 정보
const getUserProfile = async (): Promise<User> => {
  const res = await instance.get<User>(`/user/profile`);
  return res.data;
};
export const useFetchMyProfile = () => {
  return useQuery<User>({
    queryKey: ['fetchMyProfile'],
    queryFn: getUserProfile,
  });
};

// 상대방 프로필 정보 가져오기 함수
const getOpponentProfile = async (profileId: string): Promise<User> => {
  const res = await instance.get<User>(`/profile/${profileId}`);
  return res.data;
};
// 프로필 정보를 가져오는 커스텀 훅
export const useFetchProfile = (profileId: string) => {
  return useQuery<User>({
    queryKey: ['profile', profileId],
    queryFn: () => getOpponentProfile(profileId),
    enabled: !!profileId,
  });
};
