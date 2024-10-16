export const useLeaveChatRoom = (client, roomId, memberId, opponentId) => {
  const handleLeaveRoom = () => {
    try {
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: 'LEAVE',
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
    } catch (error) {
      console.log(error);
    }
  };
  return handleLeaveRoom;
};
