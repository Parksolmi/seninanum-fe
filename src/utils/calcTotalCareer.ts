import { CareerItemState } from './../store/CareerItemState';
export const calcTotalCareer = (careers: CareerItemState[]) => {
  let totalPeriod = 0;

  careers.forEach((career) => {
    const start = career.startYear * 12 + career.startMonth;
    const end = career.endYear * 12 + career.endMonth;
    totalPeriod += end - start;
  });

  const years = Math.floor(totalPeriod / 12);
  const months = totalPeriod % 12;

  return `${years}년 ${months}개월`;
};
