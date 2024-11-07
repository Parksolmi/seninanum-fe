import React, { memo, useEffect, useRef } from 'react';
import Message from './Message';
import styled from 'styled-components';

// 메시지의 타입 정의
interface MessageType {
  chatMessageId: number;
  senderId: string;
  chatMessage: string;
  unreadCount: number;
  createdAt: string;
  senderType: 'USER' | 'LEAVE' | 'COME' | 'SCHEDULE' | 'IMAGE';
  senderName?: string; // senderName은 optional로 설정
}
interface Profile {
  profileId: string;
  userType: string;
  nickname: string;
  profile: string;
}

interface MessagesProps {
  groupedMessages: { [date: string]: MessageType[] };
  myId: string;
  opponent: Profile;
  isMenuOpen: boolean;
  userType: string;
  isSend: boolean;
  onIntersect: () => void;
  setIsSend: (boolean) => void;
}

const Messages = memo(
  ({
    groupedMessages,
    myId,
    opponent,
    isMenuOpen,
    userType,
    isSend,
    onIntersect,
    setIsSend,
  }: MessagesProps) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef(null); // Observer를 위한 ref

    // scrollTop : 메세지 전송 시, 메뉴 open 시
    useEffect(() => {
      if (messageRef.current) {
        if (isMenuOpen || isSend) {
          messageRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          setIsSend(false);
        }
      }
    }, [isMenuOpen, isSend, setIsSend]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting) {
            await onIntersect();
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }
      );

      const currentObserverRef = observerRef.current;

      if (currentObserverRef) {
        observer.observe(currentObserverRef);
      }

      return () => {
        if (currentObserverRef) {
          observer.unobserve(currentObserverRef);
        }
      };
    }, [onIntersect]);

    return (
      <MessagesWrapper ref={messageRef} $isMenuOpen={isMenuOpen}>
        {Object.entries(groupedMessages)
          .reverse()
          .map(([date, messages]) => (
            <React.Fragment key={date}>
              {messages
                .slice()
                .reverse()
                .map((message) => (
                  <MessageWrapper key={message.chatMessageId}>
                    <Message
                      key={message.chatMessageId}
                      message={message}
                      isSentByMe={message.senderId === myId}
                      opponent={opponent}
                    />
                  </MessageWrapper>
                ))}
              <WrapDate>
                <div className="content">
                  {new Date(date).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}
                </div>
              </WrapDate>
            </React.Fragment>
          ))}

        <div ref={observerRef} />
        <Notice $userType={userType}>
          📢 채팅 매너를 지켜주세요! <br />
          서로를 존중하는 태도가 좋은 대화를 만듭니다.
        </Notice>
      </MessagesWrapper>
    );
  }
);

interface MessagesWrapperProp {
  $isMenuOpen: boolean;
}

const MessagesWrapper = styled.div<MessagesWrapperProp>`
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
  padding-bottom: 1rem;
  padding-top: 5.5rem;
  max-height: ${({ $isMenuOpen }) =>
    $isMenuOpen ? 'calc(100vh - 11rem)' : 'calc(100vh - 5.5rem)'};
  transition: padding 0.3s ease-in-out;
  transform: scaleY(-1); // 전체 스크롤 뷰를 뒤집기
`;

const MessageWrapper = styled.div`
  transform: scaleY(-1);
`;

interface NoticeProps {
  $userType: string;
}
const Notice = styled.div<NoticeProps>`
  border-radius: 0.5rem;
  background: ${({ $userType }) =>
    $userType === 'dong' ? 'var(--Dong-5, #ffedf0)' : 'var(--Nari-5, #ffefc1)'};
  margin: 1.5rem 1rem 0 1rem;
  padding: 0.5rem 0;

  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.03375rem;

  transform: scaleY(-1);
`;

const WrapDate = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem;
  transform: scaleY(-1);

  > .content {
    color: #000;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export default Messages;
