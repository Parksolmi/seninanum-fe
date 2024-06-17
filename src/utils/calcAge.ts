export const calcAge = (year: string) => {
  const age = new Date().getFullYear() - parseInt(year, 10);

  const aboutAge = Math.floor(age / 10) * 10;
  return `${aboutAge}대`;
};
