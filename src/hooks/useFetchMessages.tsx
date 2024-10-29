import { instance } from '../api/instance';

// 로컬 스토리지에 저장된 메세지 불러오기
// export const useFetchMessagesFromLocal = (roomId) => {
//   const fetchLocalMessages = (setMessages) => {
//     const staleMessages = localStorage.getItem('staleMessages');
//     if (staleMessages) {
//       const parsedStaleMessages = JSON.parse(staleMessages);
//       if (parsedStaleMessages[roomId]) {
//         const localMessages = JSON.parse(parsedStaleMessages[roomId]);
//         setMessages(JSON.parse(parsedStaleMessages[roomId]));
//         return localMessages;
//       }
//     }
//     return [];
//   };
//   return fetchLocalMessages;
// };

// 페이지 개수 세기
export const useCountPages = (roomId) => {
  const fetchPagesNum = async (setCurrentPage) => {
    try {
      const lastPage = await instance.get(`/chat/${roomId}`);
      setCurrentPage(lastPage.data.totalPages - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return fetchPagesNum;
};

// 페이지 메세지 불러오기
export const useFetchMessagesPerPage = (roomId) => {
  const fetchPageMessages = async (setMessages, page) => {
    try {
      const res = await instance.get(`/chat/message/${roomId}?page=${page}`);
      console.log(res);
      if (res.data.messages.length === 0) return [];
      setMessages((prevMessages) => [...res.data.messages, ...prevMessages]);
    } catch (error) {
      console.log(error);
    }
  };

  return fetchPageMessages;
};

// 서버에 저장된 모든 메세지 불러오기
// export const useFetchMessagesFromServer = (roomId) => {
//   const fetchAllMessagesFromServer = async (setMessages) => {
//     try {
//       const msg = await instance.get(`/chat/allmessages/${roomId}`);
//       if (msg.data.length === 0) return;
//       setMessages(msg.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return fetchAllMessagesFromServer;
// };

// export const useFetchUnreadMessagesFromServer = (roomId) => {
//   // 읽지 않은 메세지 서버에서 가져오기
//   const fetchUnreadMessagesFromServer = async (messages, setMessages) => {
//     try {
//       const unreadMessages = await instance
//         .get(`/chat/unread/${roomId}`)
//         .then((res) => res.data);
//       if (unreadMessages.length === 0) return;

//       // unreadMessages를 local에 저장된 stalesMessage에 추가
//       unreadMessages.forEach((unreadMessage) => {
//         if (
//           !messages.find(
//             (message) => message.messageId === unreadMessage.messageId
//           )
//         ) {
//           setMessages((messages) => [...messages, unreadMessage]);
//         }
//       });
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   return fetchUnreadMessagesFromServer;
// };
