export const useLeaveChatRoom = (client, roomId, memberId, opponentId) => {
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

      window.location.href = '/chat';
    } catch (error) {
      console.log(error);
    }
  };
  return handleLeaveRoom;
};
