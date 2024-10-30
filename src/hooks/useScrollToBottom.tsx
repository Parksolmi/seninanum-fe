export const useScrollToBottom = (messageRef, isMenuOpen) => {
  if (messageRef.current) {
    if (isMenuOpen) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: 'smooth', // 부드러운 스크롤
      });
    } else {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }
};
