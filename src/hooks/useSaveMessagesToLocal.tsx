// 로컬 스토리지에 메시지 저장
export const saveMessagesToLocal = (roomId, messages) => {
  const storedMessages = localStorage.getItem('staleMessages');
  const staleMessages = storedMessages ? JSON.parse(storedMessages) : {}; // null 처리
  staleMessages[roomId] = JSON.stringify(messages);
  localStorage.setItem('staleMessages', JSON.stringify(staleMessages));
};
