import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MessageInput from '../../components/chat/MessageInput';
// import Messages from '../../components/chat/Messages';
import useGroupedMessages from '../../hooks/useGroupedMessages';
import { Client } from '@stomp/stompjs';
import { instance } from '../../api/instance';
import { useSendMessage } from '../../hooks/useSendMessage';
import { saveMessagesToLocal } from '../../hooks/useSaveMessagesToLocal';

interface ProfileIds {
  memberId: string;
  opponentId: string;
}
interface Message {
  senderId: string;
  body: string;
  unreadCount: number;
  // 추가적인 필드들
}

const ChatPageDong = () => {
  const navigate = useNavigate();
  const { chatRoomId: roomId = '' } = useParams<{ chatRoomId: string }>();

  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draftMessage, setDraftMessage] = useState('');
  const groupedMessages = useGroupedMessages(messages);
  const [isMemberIdsFetched, setIsMemberIdsFetched] = useState(false);
  const [profileIds, setProfileIds] = useState<ProfileIds>({
    memberId: '',
    opponentId: '',
  });

  // 메시지 전송
  const { sendTextMessage } = useSendMessage(
    draftMessage,
    setDraftMessage,
    client,
    roomId,
    profileIds
  );
  const sendMessage = async () => {
    if (!draftMessage.trim()) return;

    try {
      // STOMP로 메시지 전송
      await sendTextMessage();
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  // input 값
  const handleChangeMessage = (e) => {
    setDraftMessage(e.target.value);
  };

  // 멤버 ID값 가져오기
  const fetchProfileIds = async () => {
    try {
      const response = await instance.get(`/chat/member/${roomId}`);
      const { memberId, opponentId } = response.data;
      setProfileIds({ memberId, opponentId });
      setIsMemberIdsFetched(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfileIds();
  }, []);

  // STOMP
  const subscritionCallback = (message) => {
    const parsedMessage = JSON.parse(message.body);
    console.log(message.body);
    // 디코딩
    const binaryMessage = new Uint8Array(
      Object.values(parsedMessage.chatMessage)
    );
    const decodedMessage = new TextDecoder().decode(binaryMessage);
    // 디코딩된 메시지를 다시 parsedMessage에 반영
    parsedMessage.chatMessage = decodedMessage;

    // messages 새로 set
    setMessages((prevMessages) => {
      const oldMessages = [...prevMessages];
      // 가장 최근 메시지가 상대방이 보낸 메시지인 경우 이전 메시지들은 모두 읽음 처리
      if (parsedMessage.senderId !== oldMessages.at(-1)?.senderId) {
        for (let i = 0; i < oldMessages.length; i++) {
          oldMessages[i].unreadCount = 0;
        }
      }
      return [...oldMessages, parsedMessage];
    });
  };
  useEffect(() => {
    if (isMemberIdsFetched) {
      // STOMP 클라이언트 생성
      const newClient = new Client({
        // brokerURL: 'wss://api.seninanum.shop/meet',
        brokerURL: 'ws://localhost:3001/meet',
        connectHeaders: {
          chatRoomId: roomId,
          memberId: profileIds.memberId,
        },
        debug: function (str) {
          console.log(str);
        },
        onConnect: (frame) => {
          console.log('Connected: ' + frame);
          newClient.subscribe(`/topic/chat/${roomId}`, subscritionCallback);
        },
        onStompError: (error) => {
          console.log(error);
        },
        reconnectDelay: 50,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      newClient.activate();
      setClient(newClient);

      //이전 메세지 목록 불러오기
      // const staleMessages = fetchLocalMessages(setMessages);
      // if (staleMessages.length === 0) fetchServerMessages(setMessages);
      // else fetchServerUnreadMessages(messages, setMessages);

      // 컴포넌트 언마운트 시 연결 해제
      return () => {
        newClient.deactivate();
      };
    }
  }, [isMemberIdsFetched]);

  // 메세지 전송 시
  useEffect(() => {
    console.log(messages);
    // const lastMessage = messages.at(-1);
    if (messages.length > 0) saveMessagesToLocal(roomId, messages);
  }, [messages]);

  return (
    <>
      <WrapHeader>
        <BackButton onClick={() => navigate('/chat')}>
          <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
        </BackButton>
        <TitleText>요청글 보러가기</TitleText>
      </WrapHeader>
      <Split />
      <WrapChat>
        {/* <Messages
          groupedMessages={groupedMessages}
          myId={myMemberId}
          responseCall={responseCall}
          viewImage={viewImage}
          openProfileModal={openOpponentProfileModal}
          opponentMemberCharacter={
            opponentProfile && opponentProfile.memberCharacter
          }
          isMenuOpen={isMenuOpen}
        /> */}
      </WrapChat>

      <MessageInput
        value={draftMessage}
        onChangeHandler={handleChangeMessage}
        submitHandler={sendMessage}
      />
    </>
  );
};

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.8rem 1.1rem 1.1rem 1.1rem;
`;

const Split = styled.div`
  border-top: solid 1px #ebeceb;
  padding: 0.7rem 0;
`;

const BackButton = styled.div`
  img {
    width: 0.8rem;
  }
`;

const TitleText = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-family: 'NanumSquare';
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.075rem;
  white-space: nowrap;
  text-decoration-line: underline;

  overflow: hidden;
  color: var(--Base-Black, #000);
  text-overflow: ellipsis;
  font-style: normal;
  line-height: normal;
`;

const WrapChat = styled.div`
  .date {
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 400;
    padding: 1.5rem 0 0 0;
  }
`;

export default ChatPageDong;
