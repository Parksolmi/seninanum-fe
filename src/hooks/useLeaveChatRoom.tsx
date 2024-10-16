import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal';

export const useLeaveChatRoom = (client, roomId, memberId, opponentId) => {
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    try {
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: '채팅방을 나가셨습니다.',
          senderId: memberId,
          receiverId: opponentId,
          senderType: 'LEAVE',
        }),
      });

      if (localStorage.getItem('staleMessages') !== null) {
        const staleMessages = JSON.parse(
          localStorage.getItem('staleMessages') || '[]'
        );
        delete staleMessages[roomId];
        localStorage.setItem('staleMessages', JSON.stringify(staleMessages));
      }
      navigate('/chat');
    } catch (error) {
      console.log(error);
    }
  };
  return handleLeaveRoom;
};
