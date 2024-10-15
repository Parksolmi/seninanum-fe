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
  senderType: 'USER' | 'SYSTEM';
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
}

const Messages = memo(
  ({
    groupedMessages,
    myId,
    opponent,
  }: // isMenuOpen,
  MessagesProps) => {
    const messageRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    };

    useLayoutEffect(() => {
      scrollToBottom();
    }, [groupedMessages]);

    return (
      <MessagesWrapper ref={messageRef}>
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
                // openProfileModal={openProfileModal}
              />
            ))}
          </React.Fragment>
        ))}
      </MessagesWrapper>
    );
  }
);

const MessagesWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
  padding-bottom: 5.5rem;
  max-height: calc(100vh - 5.5rem);
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
