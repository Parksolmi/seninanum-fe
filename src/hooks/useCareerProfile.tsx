import { instance } from '../api/instance';
import { useQuery } from '@tanstack/react-query';
import { CareerProfile } from '../interface/careerProfileInterface';

// 전에 저장된 경력 프로필 데이터
const getCareerProfile = async (): Promise<CareerProfile> => {
  const res = await instance.get<CareerProfile>(`/career`);
  return res.data;
};

export const useFetchCareerProfile = () => {
  return useQuery<CareerProfile>({
    queryKey: ['fetchCareerProfile'],
    queryFn: getCareerProfile,
  });
};
