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
  publishType: 'USER' | 'SYSTEM';
  senderName?: string; // senderName은 optional로 설정
}

interface MessagesProps {
  groupedMessages: { [date: string]: MessageType[] };
  myId: string;
}

const Messages = memo(
  ({
    groupedMessages,
    myId,
  }: // openProfileModal,
  // isMenuOpen,
  MessagesProps) => {
    const messageRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      console.log(messageRef.current);
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
  overflow: auto;
  flex: 1;
  min-height: 0;
  z-index: 0;
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
