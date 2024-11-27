export const useSendMessage = (
  draftMessage,
  setDraftMessage,
  client,
  roomId,
  memberId,
  opponentId
) => {
  const sendImageMessage = async (image, setImage) => {
    try {
      const binaryData = new TextEncoder().encode(image);
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: binaryData,
          senderId: memberId,
          receiverId: opponentId,
          senderType: 'IMAGE',
        }),
        headers: { 'content-type': 'application/octet-stream' },
      });

      setImage(null); // 이미지 전송 후 초기화
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // 텍스트 전송
  const sendTextMessage = () => {
    try {
      const binaryData = new TextEncoder().encode(draftMessage);
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: binaryData,
          senderId: memberId,
          receiverId: opponentId,
          senderType: 'USER',
        }),
        headers: { 'content-type': 'application/octet-stream' },
      });

      setDraftMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  // 약속 잡기 메세지
  const sendScheduleMessage = (schedule) => {
    try {
      const scheduleData = JSON.stringify(schedule);
      const binaryData = new TextEncoder().encode(scheduleData);
      console.log('Sending schedule:', schedule);
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: binaryData,
          senderId: memberId,
          receiverId: opponentId,
          senderType: 'SCHEDULE',
        }),
        headers: { 'content-type': 'application/octet-stream' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 송금 요청 메세지
  const sendPayRequestMessage = (pay) => {
    try {
      const binaryData = new TextEncoder().encode(pay);
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: binaryData,
          senderId: memberId,
          receiverId: opponentId,
          senderType: 'PAY_REQUEST',
        }),
        headers: { 'content-type': 'application/octet-stream' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 송금 받음 메세지
  const sendPayResponseMessage = (pay) => {
    try {
      const binaryData = new TextEncoder().encode(pay);
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({
          chatMessage: binaryData,
          senderId: memberId,
          receiverId: opponentId,
          senderType: 'PAY_RESPONSE',
        }),
        headers: { 'content-type': 'application/octet-stream' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // // 읽음 신호 메세지
  // const sendComeInMessage = () => {
  //   try {
  //     client.publish({
  //       destination: `/app/chat/${roomId}`,
  //       body: JSON.stringify({
  //         chatMessage: '',
  //         senderId: opponentMemberId,
  //         receiverId: myMemberId,
  //         publishType: 'COME',
  //       }),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    sendImageMessage,
    sendTextMessage,
    sendScheduleMessage,
    sendPayRequestMessage,
    sendPayResponseMessage,
  };
};
