import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Career {
  id: number;
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  content: string;
}

interface CareerState {
  careers: Career[];
  addCareer: (career: Career) => void;
  removeCareer: (id: number) => void;
  totalPeriod: () => string;
}
// 경력 초기화
const getInitialCareers = (): Career[] => {
  try {
    const storedCareers = localStorage.getItem('careers');
    if (storedCareers) {
      return JSON.parse(storedCareers);
    }
  } catch (error) {
    console.error('Failed to parse careers from localStorage', error);
  }
  return [];
};
// 총 경력기간 계산
const calculateTotalPeriod = (careers: Career[]): string => {
  let totalYears = 0;
  let totalMonths = 0;

  careers.forEach((career) => {
    let years = career.endYear - career.startYear;
    let months = career.endMonth - career.startMonth;

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    totalYears += years;
    totalMonths += months;
  });

  totalYears += Math.floor(totalMonths / 12);
  totalMonths = totalMonths % 12;

  return `총 경력 ${totalYears}년 ${totalMonths}개월`;
};
// 경력 추가,경력 삭제
const useCareerStore = create<CareerState>()(
  devtools(
    (set, get) => ({
      careers: getInitialCareers(),
      addCareer: (career) =>
        set((state) => {
          const updatedCareers = [...state.careers, career];
          localStorage.setItem('careers', JSON.stringify(updatedCareers));
          return { careers: updatedCareers };
        }),
      removeCareer: (id) =>
        set((state) => {
          const updatedCareers = state.careers.filter(
            (career) => career.id !== id
          );
          localStorage.setItem('careers', JSON.stringify(updatedCareers));
          return { careers: updatedCareers };
        }),
      totalPeriod: () => calculateTotalPeriod(get().careers),
    }),
    { name: 'CareerStore' }
  )
);

export default useCareerStore;
