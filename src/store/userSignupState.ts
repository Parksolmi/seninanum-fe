import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  userId: string;
  userType: string;
  nickname: string;
  gender: string;
  birthYear: string;
  profile: string;
  agreeAgePolicy: boolean;
  agreeServicePolicy: boolean;
  agreeMarketingPolicy: boolean;
}

interface UserStateType {
  userState: UserState;
  setUserState: (userState: Partial<UserState>) => void;
}

const useUserStore = create<UserStateType>()(
  devtools((set) => ({
    userState: {
      userId: '',
      userType: '',
      nickname: '',
      gender: '',
      birthYear: '',
      profile: '',
      agreeAgePolicy: false,
      agreeServicePolicy: false,
      agreeMarketingPolicy: false,
    },
    setUserState: (userState: Partial<UserState>) =>
      set((state) => ({
        userState: { ...state.userState, ...userState },
      })),
  }))
);

export default useUserStore;
