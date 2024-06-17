export const formatDate = (originalDate: string) => {
  const date = new Date(originalDate);

  // 월, 일 추출
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  // 시간, 분 추출
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  const formattedDate = `${month}.${day} ${hours}:${minutes}`;

  return formattedDate; // "06.16 23:00"
};
