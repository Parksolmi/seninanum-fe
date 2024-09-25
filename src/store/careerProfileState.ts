import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import useCareerItemState from './careerItemState';

interface CareerProfileState {
  progressStep: number;
  fileName: string;
  fileProgress: string;
  introduce: string;
  age: string;
  field: string;
  service: string;
  method: string;
  region: string;
  priceType: string;
  price: number;
}

interface CareerProfileStateType {
  careerProfileState: CareerProfileState;
  setCareerProfileState: (userState: Partial<CareerProfileState>) => void;
  calculateProgress: () => void;
}

const useCareerProfileState = create<CareerProfileStateType>()(
  devtools((set, get) => ({
    careerProfileState: {
      progressStep: 0,
      fileName: '',
      fileProgress: '',
      introduce: '',
      age: '',
      field: '',
      service: '',
      method: '',
      region: '',
      priceType: '',
      price: -1,
    },
    setCareerProfileState: (careerProfileState) =>
      set((state) => ({
        careerProfileState: {
          ...state.careerProfileState,
          ...careerProfileState,
        },
      })),
    calculateProgress: () => {
      const state = get().careerProfileState;
      const { careers } = useCareerItemState.getState();
      let progressCount = 0;

      if (careers.length > 0) progressCount++;
      if (state.fileName) progressCount++;
      if (state.introduce) progressCount++;
      if (state.age) progressCount++;
      if (state.field) progressCount++;
      if (state.service) progressCount++;
      if (state.method) progressCount++;
      if (state.priceType && state.price >= 0) progressCount++;

      set((state) => ({
        careerProfileState: {
          ...state.careerProfileState,
          progressStep: progressCount,
        },
      }));
    },
  }))
);
export default useCareerProfileState;
