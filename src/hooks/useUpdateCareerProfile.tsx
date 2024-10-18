import { instance } from '../api/instance';
import useCareerProfileState from '../store/careerProfileState';

//  프로필 중간 저장
export const useUpdateCareerProfile = (careerProfileId) => {
  const { careerProfileState } = useCareerProfileState();

  const updateProfile = async () => {
    try {
      instance.patch('/career', {
        profileId: careerProfileId,
        age: careerProfileState.age,
        field: careerProfileState.field,
        service: careerProfileState.service,
        method: careerProfileState.method,
        region: careerProfileState.region,
        priceType: careerProfileState.priceType,
        price: careerProfileState.price,
        introduce: careerProfileState.introduce,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return { updateProfile };
};
