import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RecruitState {
  title: string;
  content: string;
  method: string;
  priceType: string;
  price: number;
  region: string;
  field: string;
}
interface RecruitStateType {
  recruitState: RecruitState;
  setRecruitState: (userState: Partial<RecruitState>) => void;
}

const useRecruitState = create<RecruitStateType>()(
  devtools((set) => ({
    recruitState: {
      title: '',
      content: '',
      method: '',
      priceType: '',
      price: -1,
      region: '',
      field: '',
    },
    setRecruitState: (recruitState) =>
      set((state) => ({
        recruitState: { ...state.recruitState, ...recruitState },
      })),
  }))
);

export default useRecruitState;
