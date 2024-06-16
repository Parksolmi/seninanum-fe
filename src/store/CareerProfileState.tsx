import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CareerProfileState {
  introduce: string;
  service: string;
  method: string;
  priceType: string;
  price: number;
  region: string;
  field: string;
}

interface CareerProfileStateType {
  careerProfileState: CareerProfileState;
  setCareerProfileState: (userState: Partial<CareerProfileState>) => void;
}

const useCareerProfileState = create<CareerProfileStateType>()(
  devtools(
    persist(
      (set) => ({
        careerProfileState: {
          introduce: '',
          service: '',
          method: '',
          priceType: '',
          price: -1,
          region: '',
          field: '',
        },
        setCareerProfileState: (careerProfileState) =>
          set((state) => ({
            careerProfileState: {
              ...state.careerProfileState,
              ...careerProfileState,
            },
          })),
      }),
      {
        name: 'careerProfileState',
      }
    )
  )
);
export default useCareerProfileState;
