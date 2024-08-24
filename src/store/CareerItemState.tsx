import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CareerItemState {
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  period: string;
  content: string;
}

interface CareerAddState {
  career: CareerItemState;
  careers: CareerItemState[];
  setCareers: (careers: CareerItemState[]) => void;
  addCareer: (career: CareerItemState) => void;
  // removeCareer: (careerId: number) => void;
}
const useCareerItemState = create<CareerAddState>()(
  devtools(
    (set) => ({
      career: {
        title: '',
        startYear: 0,
        startMonth: 0,
        endYear: 0,
        endMonth: 0,
        period: '',
        content: '',
      },
      careers: [],
      setCareers: (careers) => set({ careers }),
      addCareer: (career) =>
        set((state) => ({
          careers: [...state.careers, career],
        })),
      //   removeCareer: (careerId) =>
      //     set((state) => ({
      //       careers: state.careers.filter(
      //         (career) => career.careerId !== careerId
      //       ),
      //     })),
    }),
    {
      name: 'useCareerItemState',
    }
  )
);

export default useCareerItemState;
