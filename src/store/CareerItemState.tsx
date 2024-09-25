import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { calcTotalCareer } from '../utils/calcTotalCareer';

export interface CareerItemState {
  careerId: number;
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  content: string;
}

interface CareerAddState {
  career: CareerItemState;
  careers: CareerItemState[];
  setCareers: (careers: CareerItemState[]) => void;
  addCareer: (career: CareerItemState) => void;
}
const useCareerItemState = create<CareerAddState>()(
  devtools((set) => ({
    career: {
      careerId: -1,
      title: '',
      startYear: 0,
      startMonth: 0,
      endYear: 0,
      endMonth: 0,
      content: '',
    },
    careers: [],
    setCareers: (careers) => set({ careers }),
    addCareer: (career) =>
      set((state) => {
        const newCareers = [...state.careers, career];
        const totalPeriod = calcTotalCareer(newCareers);

        return {
          careers: newCareers.map((c) => ({
            ...c,
            period: totalPeriod,
          })),
        };
      }),
  }))
);

export default useCareerItemState;
