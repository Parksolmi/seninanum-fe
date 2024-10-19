import React, { memo, useLayoutEffect, useRef } from 'react';
import Message from './Message';
import styled from 'styled-components';

// 메시지의 타입 정의
interface MessageType {
  chatMessageId: number;
  senderId: string;
  chatMessage: string;
  unreadCount: number;
  createdAt: string;
  senderType: 'USER' | 'LEAVE' | 'COME';
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
}

const Messages = memo(
  ({ groupedMessages, myId, opponent, isMenuOpen }: MessagesProps) => {
    const messageRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
      const scrollToBottom = () => {
        if (messageRef.current) {
          if (isMenuOpen) {
            messageRef.current.scrollTo({
              top: messageRef.current.scrollHeight,
              behavior: 'smooth', // 부드러운 스크롤
            });
          } else {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
          }
        }
      };
      scrollToBottom();
    }, [groupedMessages, isMenuOpen]);

    return (
      <MessagesWrapper ref={messageRef} $isMenuOpen={isMenuOpen}>
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <React.Fragment key={date}>
            <WrapDate>
              <div className="content">
                {new Date(date).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </div>
            </WrapDate>
            {messages.map((message) => (
              <Message
                key={message.chatMessageId}
                message={message}
                isSentByMe={message.senderId === myId}
                opponent={opponent}
              />
            ))}
          </React.Fragment>
        ))}
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
  padding-bottom: 5.5rem;
  max-height: ${({ $isMenuOpen }) =>
    $isMenuOpen ? 'calc(100vh - 11rem)' : 'calc(100vh - 5.5rem)'};
  transition: padding 0.3s ease-in-out;
`;

const WrapDate = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem;

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
