import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserTypeState {
  userType: string;
  setUserType: (type: string) => void;
}

const userTypeStore = create<UserTypeState>()(
  devtools(
    persist(
      (set) => ({
        userType: '',
        setUserType: (type: string) => set({ userType: type }),
      }),
      {
        name: 'userTypeState',
      }
    )
  )
);

export default userTypeStore;
