import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CareerFilterState {
  field: string;
  method: string;
  region: string;
  priceType: string;
  price: number;
}
interface CareerFilterStateType {
  careerFilterState: CareerFilterState;
  setCareerFilterState: (userState: Partial<CareerFilterState>) => void;
}

const useCareerFilterState = create<CareerFilterStateType>()(
  devtools((set) => ({
    careerFilterState: {
      field: '',
      method: '',
      region: '',
      priceType: '',
      price: -1,
    },
    setCareerFilterState: (careerFilterState) =>
      set((state) => ({
        careerFilterState: { ...state.careerFilterState, ...careerFilterState },
      })),
  }))
);

export default useCareerFilterState;
