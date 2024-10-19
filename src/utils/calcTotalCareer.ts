import { CareerProfile } from '../interface/careerProfileInterface';

export const calcTotalCareer = (careers: CareerProfile['careerItems']) => {
  let totalPeriod = 0;

  careers.forEach((career) => {
    const start = career.startYear * 12 + career.startMonth;
    const end = career.endYear * 12 + career.endMonth;
    totalPeriod += end - start;
  });

  const years = Math.floor(totalPeriod / 12);
  const months = totalPeriod % 12;

  if (months === 0) return `${years}년`;
  else if (years === 0) return `${months}개월`;
  else return `${years}년 ${months}개월`;
};
