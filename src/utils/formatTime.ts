export const parseTime = (time: string) => {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // 오전/오후 설정
  const period = hours < 12 ? '오전' : '오후';

  // 12시간 형식으로 변환
  hours = hours % 12 || 12; // 0시일 경우 12로 변경

  return `${period} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

export const formatTime = (time: string) => {
  const today = new Date();
  const date = new Date(time);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 오늘 날짜와 같은 경우
  if (today.toDateString() === date.toDateString()) {
    return parseTime(time);
  }
  // 어제 날짜와 같은 경우
  else if (yesterday.toDateString() === date.toDateString()) {
    return '어제';
  }
  // 그 외 (어제보다 이전의 날짜)
  else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};
