import { useNavigate } from 'react-router-dom';
import { instance } from '../api/instance';

export const useCreateChatRoom = () => {
  const navigate = useNavigate();

  const handleCreateChatRoom = async (opponentMemberId, setIsButtonClicked) => {
    await instance
      .post('/chatroom/create', {
        oppProfileId: opponentMemberId,
      })
      .then((res) => {
        setIsButtonClicked(true); //연타 방지
        const chatRoomId = res.data;
        navigate(`/chat/${chatRoomId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return handleCreateChatRoom;
};
