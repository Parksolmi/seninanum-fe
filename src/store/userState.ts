import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserTypeState {
  userType: string;
  profileStep: number;
  setUserType: (type: string) => void;
  setProfileStep: (step: number) => void;
}

const userTypeStore = create<UserTypeState>()(
  devtools(
    persist(
      (set) => ({
        userType: '',
        profileStep: -1,
        setUserType: (type: string) => set({ userType: type }),
        setProfileStep: (step: number) => set({ profileStep: step }),
      }),
      {
        name: 'userTypeState',
      }
    )
  )
);

export default userTypeStore;
