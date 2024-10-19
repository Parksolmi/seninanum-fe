import { instance } from '../api/instance';
import { useQuery } from 'react-query';
import { CareerProfile } from '../interface/careerProfileInterface';

// 전에 저장된 경력 프로필 데이터
const getCareerProfile = async () => {
  const res = await instance.get<CareerProfile>(`/career`);
  return res.data;
};
export const useFetchCareerProfile = () => {
  return useQuery<CareerProfile>('fetchCareerProfileKey', getCareerProfile);
};
