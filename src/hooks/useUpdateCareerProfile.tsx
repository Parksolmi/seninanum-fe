import { instance } from '../api/instance';

//  프로필 중간 저장
export const useUpdateCareerProfile = (careerProfileId, careerProfile) => {
  const updateProfile = async () => {
    try {
      instance.patch('/career', {
        profileId: careerProfileId,
        age: careerProfile.age,
        field: careerProfile.field,
        service: careerProfile.service,
        method: careerProfile.method,
        region: careerProfile.region,
        priceType: careerProfile.priceType,
        price: careerProfile.price,
        introduce: careerProfile.introduce,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return { updateProfile };
};
