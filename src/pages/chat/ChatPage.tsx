import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MessageInput from '../../components/chat/MessageInput';
import Messages from '../../components/chat/Messages';
import useGroupedMessages from '../../hooks/useGroupedMessages';
import { Client } from '@stomp/stompjs';
import { instance } from '../../api/instance';
import { useSendMessage } from '../../hooks/useSendMessage';
import { saveMessagesToLocal } from '../../hooks/useSaveMessagesToLocal';
import {
  useFetchMessagesFromLocal,
  useFetchMessagesFromServer,
  useFetchUnreadMessagesFromServer,
} from '../../hooks/useFetchMessages';
import { SyncLoader } from 'react-spinners';
import { useLeaveChatRoom } from '../../hooks/useLeaveChatRoom';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';
import { stompBrokerURL } from '../../constants/baseUrl';
import { checkCurse } from '../../utils/checkCurse';
import { useToast } from '../../hooks/useToast';

interface Profile {
  profileId: string;
  userType: string;
  nickname: string;
  profile: string;
}

interface ProfileIds {
  memberProfile: Profile;
  opponentProfile: Profile;
}

interface Message {
  chatMessage: string;
  chatMessageId: number;
  chatRoomId: number;
  senderId: number;
  createdAt: string;
  senderType: 'USER' | 'LEAVE' | 'COME';
  unreadCount: number;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const { chatRoomId: roomId = '' } = useParams<{ chatRoomId: string }>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastReadMessageId, setLastMessageId] = useState<number | null>();
  const [roomStatus, setRoomStatus] = useState<string | null>();
  const [draftMessage, setDraftMessage] = useState('');
  const groupedMessages = useGroupedMessages(messages);
  const [isMembersFetched, setIsMembersFetched] = useState(false);
  const [profile, setProfile] = useState<ProfileIds>({
    memberProfile: {
      profileId: '',
      userType: '',
      nickname: '',
      profile: '',
    },
    opponentProfile: {
      profileId: '',
      userType: '',
      nickname: '',
      profile: '',
    },
  });

  //수정사항! react-query로 바꾸기
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocalMessages = useFetchMessagesFromLocal(roomId);
  const fetchServerMessages = useFetchMessagesFromServer(roomId);
  const fetchServerUnreadMessages = useFetchUnreadMessagesFromServer(roomId);

  //모달 창
  const { openModal: openLeaveModal, closeModal: closeLeaveModal } = useModal(
    (id) => (
      <Modal
        userType={profile.memberProfile.userType}
        title={'정말 나가시겠습니까?'}
        content={``}
        cancelText={'취소'}
        confirmText={'나가기'}
        onConfirm={handleLeaveRoom}
        onCancel={closeLeaveModal}
      />
    )
  );

  //토스트 메세지
  const { showToast: showBadWordToast } = useToast(
    () => <span>앗! 부적절한 단어가 포함되어 있어요.</span>,
    'bad-word'
  );

  // 메시지 전송
  const { sendTextMessage } = useSendMessage(
    draftMessage,
    setDraftMessage,
    client,
    roomId,
    profile.memberProfile.profileId,
    profile.opponentProfile.profileId
  );
  const sendMessage = async () => {
    if (!draftMessage.trim()) return;

    // 욕설 필터링
    const isIncludingBadWord = checkCurse(draftMessage);
    if (isIncludingBadWord) {
      showBadWordToast();
      setDraftMessage('');
      return;
    }

    try {
      // STOMP로 메시지 전송
      await sendTextMessage();
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  // 채팅방 나가기
  const handleLeaveRoom = useLeaveChatRoom(
    client,
    roomId,
    profile.memberProfile.profileId,
    profile.opponentProfile.profileId
  );

  // input 값
  const handleChangeMessage = (e) => {
    setDraftMessage(e.target.value);
  };

  const handleBackButton = async () => {
    try {
      await instance.post('/chat/disconnect', {
        roomId: roomId,
        lastReadMessageId: lastReadMessageId,
      });
      navigate('/chat');
    } catch (error) {
      console.log(error);
    }
  };

  // 멤버 ID값, roomStatus 가져오기
  useEffect(() => {
    const fetchProfileIds = async () => {
      try {
        const response = await instance.get(`/chat/info/${roomId}`);
        const { memberProfile, opponentProfile, roomStatus } = response.data;
        setProfile({ memberProfile, opponentProfile });
        setIsMembersFetched(true);
        setRoomStatus(roomStatus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileIds();
  }, [roomId]);

  // STOMP
  const subscritionCallback = (message) => {
    const parsedMessage = JSON.parse(message.body);
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
    if (isMembersFetched) {
      // STOMP 클라이언트 생성
      const newClient = new Client({
        brokerURL: stompBrokerURL,
        // brokerURL: 'ws://localhost:3001/meet',
        connectHeaders: {
          chatRoomId: roomId,
          memberId: profile.memberProfile.profileId,
        },
        debug: function (str) {
          console.log(str);
        },
        onConnect: (frame) => {
          setIsLoading(false);
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
      fetchLocalMessages(setMessages);
      const staleMessages = fetchLocalMessages(setMessages);
      if (staleMessages.length === 0) fetchServerMessages(setMessages);
      else fetchServerUnreadMessages(messages, setMessages);

      // 컴포넌트 언마운트 시 연결 해제
      return () => {
        newClient.deactivate();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMembersFetched, roomId, profile.memberProfile.profileId]);

  // 메세지 전송 시
  useEffect(() => {
    console.log(messages);
    setLastMessageId(messages?.at(-1)?.chatMessageId ?? null);
    // const lastMessage = messages.at(-1);
    if (messages.length > 0) saveMessagesToLocal(roomId, messages);
  }, [messages, roomId]);

  return (
    <Wrapper>
      <Container>
        <WrapHeader>
          <BackButton onClick={handleBackButton}>
            <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
          </BackButton>
          {profile.memberProfile.userType === 'dong' ? (
            <TitleText className="dong">요청글 보러가기</TitleText>
          ) : (
            <TitleText>{profile.opponentProfile.nickname} 동백</TitleText>
          )}
          <LeaveRoomButton onClick={openLeaveModal}>
            <img src={'/assets/chat/exit-icon.png'} alt="나가기" />
          </LeaveRoomButton>
        </WrapHeader>
        <Split />
        {isLoading ? (
          <WrapLoader>
            <SyncLoader
              color={`var(--Primary-${profile.memberProfile.userType})`}
            />
          </WrapLoader>
        ) : (
          <>
            <WrapChat>
              {/* <Notice $userType={profile.memberProfile.userType}>
                📢 채팅 매너를 지켜주세요! <br />
                서로를 존중하는 태도가 좋은 대화를 만듭니다.
              </Notice> */}
              <Messages
                groupedMessages={groupedMessages}
                myId={profile.memberProfile.profileId}
                opponent={profile.opponentProfile}
                isMenuOpen={isMenuOpen}
                userType={profile.memberProfile.userType}
              />
            </WrapChat>
            {roomStatus === 'ACTIVE' && (
              <MessageInput
                value={draftMessage}
                onChangeHandler={handleChangeMessage}
                submitHandler={sendMessage}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  touch-action: none;
  overflow: hidden;
`;

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.8rem 1.1rem 1.1rem 1.1rem;

  position: relative;
  background: #ffffff;
  display: flex;
  z-index: 11;
`;

const Split = styled.div`
  border-top: solid 1px #ebeceb;
  /* padding: 0.7rem 0; */
`;

const BackButton = styled.div`
  img {
    width: 0.8rem;
  }
`;

const LeaveRoomButton = styled.div`
  img {
    width: 1.6rem;
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

  overflow: hidden;
  color: var(--Base-Black, #000);
  text-overflow: ellipsis;
  font-style: normal;
  line-height: normal;
  &.dong {
    text-decoration-line: underline;
  }
`;

// interface NoticeProps {
//   $userType: string;
// }
// const Notice = styled.div<NoticeProps>`
//   border-radius: 0.5rem;
//   background: ${({ $userType }) =>
//     $userType === 'dong' ? 'var(--Dong-5, #ffedf0)' : 'var(--Nari-5, #ffefc1)'};
//   margin: 1.5rem 1rem 0 1rem;

//   text-align: center;
//   font-family: NanumSquare;
//   font-size: 1.125rem;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
//   letter-spacing: 0.03375rem;
// `;

const WrapChat = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const WrapLoader = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 100dvh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: height 0.3s;
`;

export default ChatPage;
