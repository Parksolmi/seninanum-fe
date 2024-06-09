import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  userType: string;
  nickname: string;
  gender: string;
  birthYear: string;
  profile: string;
}
interface UserStateType {
  userState: UserState;
  setUserState: (userState: Partial<UserState>) => void;
}

const useUserState = create<UserStateType>()(
  devtools(
    persist(
      (set) => ({
        userState: {
          userType: '',
          nickname: '',
          gender: '',
          birthYear: '',
          profile: '',
        },
        setUserState: (userState) =>
          set((state) => ({
            userState: { ...state.userState, ...userState },
          })),
      }),
      {
        name: 'userState',
      }
    )
  )
);

export default useUserState;
