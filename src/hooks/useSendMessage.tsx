// import { instance } from '../api/instance';

export const useSendMessage = (
  draftMessage,
  setDraftMessage,
  // setFile,
  // file,
  client,
  roomId,
  memberId,
  opponentId
) => {
  // // 이미지 전송
  // const sendImageMessage = async () => {
  //   //S3 url 받기
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   const response = await instance.post('/image', formData);
  //   try {
  //     client.publish({
  //       destination: `/app/chat/${roomId}`,
  //       body: JSON.stringify({
  //         chatMessage: response.data.imageUrl,
  //         senderId: opponentMemberId,
  //         receiverId: myMemberId,
  //         publishType: 'IMAGE',
  //       }),
  //     });

  //     setDraftMessage('');
  //     setFile(null);
  //   } catch (error) {
  //     showWaitToast();
  //   }
  // };

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

  return { sendTextMessage, sendScheduleMessage };
};
