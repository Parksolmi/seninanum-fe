import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CareerItemState {
  id: number;
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  period: string;
  content: string;
}

interface CareerAddState {
  careers: CareerItemState[];
  setCareers: (careers: CareerItemState[]) => void;
  addCareer: (career: CareerItemState) => void;
  removeCareer: (id: number) => void;
}
const useCareerItemState = create<CareerAddState>()(
  devtools(
    persist(
      (set) => ({
        careers: [],
        setCareers: (careers) => set({ careers }),
        addCareer: (career) =>
          set((state) => ({
            careers: [...state.careers, career],
          })),
        removeCareer: (id) =>
          set((state) => ({
            careers: state.careers.filter((career) => career.id !== id),
          })),
      }),
      {
        name: 'useCareerItemState',
      }
    )
  )
);

export default useCareerItemState;
