import React, { memo } from 'react';
import styled from 'styled-components';
import { parseTime } from '../../utils/formatTime';

interface MessageType {
  senderId: string;
  chatMessage: string;
  unreadCount: number;
  createdAt: string;
  publishType: 'USER' | 'SYSTEM';
  senderName?: string; // senderName은 optional로 설정
}

interface MessageProps {
  message: MessageType;
  isSentByMe: boolean;
}

const Message = memo(({ message, isSentByMe }: MessageProps) => {
  switch (message.publishType) {
    case 'SYSTEM':
      return (
        <Announcement>
          <div className="content">{message.chatMessage}</div>
        </Announcement>
      );
    case 'USER':
      return isSentByMe ? (
        <MessageByMe>
          <div className="message-container">
            <div className="read">
              {message.unreadCount !== 0 ? message.unreadCount : ''}
            </div>
            <div className="wrapper">
              <div className="message">{message.chatMessage}</div>
              <div className="time">{parseTime(message.createdAt)}</div>
            </div>
          </div>
        </MessageByMe>
      ) : (
        <MessageByOther>
          <WrapProfile
          // onClick={openProfileModal}
          >
            <img src="/assets/character/dong-pay.png" alt="profile" />
          </WrapProfile>
          <div className="message-section">
            <div className="nickname">닉네임 나리</div>
            <div className="message-container">
              <div className="wrapper">
                <div className="message">{message.chatMessage}</div>
                <div className="time">{parseTime(message.createdAt)}</div>
              </div>
              <div className="read">
                {message.unreadCount !== 0 ? message.unreadCount : ''}
              </div>
            </div>
          </div>
        </MessageByOther>
      );
    default:
      return null;
  }
});

const Announcement = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px;

  > .content {
    font-size: 0.7rem;
    background-color: #eee;
    padding: 0.5rem;
    text-align: center;
    border-radius: 9999px;
  }
`;

const WrapProfile = styled.div`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;

  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 50%;
    background-color: #cecece; //임시
  }
`;

const MessageByOther = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: start;
  margin: 16px;

  .message-section {
    > .nickname {
      color: #000;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    > .message-container {
      display: flex;
      align-items: end;
      gap: 0.5rem;
      position: relative;
      flex-grow: 1;

      > .wrapper {
        font-size: 0.6rem;
        /* > .read {
          color: #ff625d;
        } */
        > .message {
          width: fit-content;
          max-width: 100%;
          background-color: #f5f5f5;
          padding: 10px;
          overflow-wrap: break-word;
          word-break: break-word;

          border-radius: 0rem 1.1875rem 1.1875rem 1.1875rem;
          background: var(--Base-Gray2, #ebeceb);

          color: var(--Base-Black, #000);
          font-family: NanumSquare;
          font-size: 1.25rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;

          a {
            color: black;
          }
        }
        > .time {
          color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
          text-align: center;
          font-family: NanumSquare;
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding-top: 0.2rem;
        }
      }
    }
  }
`;

const MessageByMe = styled.div`
  margin: 16px;
  display: flex;
  justify-content: flex-end;

  > .message-container {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    gap: 0.5rem;
    max-width: 80%;

    > .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: end;
      text-align: right;
      font-size: 0.6rem;
      /* > .read {
        color: #ff625d;
      } */
      > .message {
        width: fit-content;
        max-width: 100%; // 변경: content의 최대 너비를 wrapper에 맞게 조절
        padding: 10px;
        line-height: 1.5;
        overflow-wrap: break-word;
        word-break: break-word;

        border-radius: 0.875rem 0rem 0.875rem 0.875rem;
        background: var(--Primary-dong, #ff314a);
        color: var(--Base-White, var(--White, #fff));
        font-family: NanumSquare;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        .link {
          text-decoration: underline;
        }

        a {
          color: white;
        }
      }

      > .time {
        color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
        text-align: center;
        font-family: NanumSquare;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-top: 0.2rem;
      }
    }
  }
`;

export default Message;
