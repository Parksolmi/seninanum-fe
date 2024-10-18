export const formatDate = (originalDate: string, includeTime?: boolean) => {
  const date = new Date(originalDate);

  // 연도, 월, 일 추출
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  // 시간, 분 추출
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // 요일 추출 (0: 일요일, 6: 토요일)
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];

  // 최종 형식: 연도.월.일 (요일) 시간:분
  let formattedDate = `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;
  if (includeTime) {
    formattedDate = `${year}.${month}.${day}`;
  }
  return formattedDate; // 예: "2024.10.17 (목) 15:33"
};
