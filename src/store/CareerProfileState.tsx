import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CareerProfileState {
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
}

const useCareerProfileState = create<CareerProfileStateType>()(
  devtools(
    persist(
      (set) => ({
        careerProfileState: {
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
      }),
      {
        name: 'careerProfileState',
      }
    )
  )
);
export default useCareerProfileState;
