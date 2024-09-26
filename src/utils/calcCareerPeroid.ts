export const calcCareerPeroid = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
) => {
  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (months === 0) return `${years}년`;
  else if (years === 0) return `${months}개월`;
  return `${years}년 ${months}개월`;
};
