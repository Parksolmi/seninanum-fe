import { instance } from '../api/instance';
import { useQuery } from 'react-query';

// User 인터페이스 정의
interface User {
  nickname: string;
  gender: '여성' | '남성';
  birthYear: string;
  profile: string;
}

// 내 프로필 정보
const getUserProfile = async () => {
  const res = await instance.get<User>(`/user/profile`);
  return res.data;
};
export const useFetchMyProfile = () => {
  return useQuery<User>('fetchMyProfileKey', getUserProfile);
};

// 남의 프로필 정보
const getOpponentProfile = async (profileId) => {
  const res = await instance.get<User>(`/profile/${profileId}`);
  return res.data;
};
export const useFetchProfile = (profileId) => {
  return useQuery<User>(
    profileId, // 쿼리 키에 profileId를 포함하여 캐시 관리
    () => getOpponentProfile(profileId),
    {
      enabled: !!profileId, // profileId가 있을 때만 쿼리를 실행
    }
  );
};
