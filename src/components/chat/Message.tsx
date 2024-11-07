import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { parseTime } from '../../utils/formatTime';
import AlertSchedule from './AlertSchedule';

interface MessageType {
  chatMessageId: number;
  senderId: string;
  chatMessage: string;
  unreadCount: number;
  createdAt: string;
  senderType: 'USER' | 'LEAVE' | 'COME' | 'SCHEDULE' | 'IMAGE';
  senderName?: string;
}
interface Profile {
  profileId: string;
  userType: string;
  nickname: string;
  profile: string;
}

interface MessageProps {
  message: MessageType;
  isSentByMe: boolean;
  opponent: Profile;
  viewImage?: () => void;
}

const Message = memo(
  ({ message, isSentByMe, opponent, viewImage }: MessageProps) => {
    const navigate = useNavigate();

    switch (message.senderType) {
      case 'COME':
      case 'LEAVE':
        return (
          <Announcement>
            <div className="content">{`${opponent.nickname} ${
              opponent.userType === 'dong' ? '동백' : '나리'
            }님이 ${message.chatMessage}`}</div>
          </Announcement>
        );
      case 'USER':
        return isSentByMe ? (
          <MessageByMe $userType={opponent.userType}>
            <div className="message-container">
              <div className="wrapper">
                <div className="wrapper-top">
                  <div className="read">
                    {message.unreadCount !== 0 ? message.unreadCount : ''}
                  </div>
                  <div className="message">{message.chatMessage}</div>
                </div>
                <div className="time">{parseTime(message.createdAt)}</div>
              </div>
            </div>
          </MessageByMe>
        ) : (
          <MessageByOther>
            <WrapProfile
              onClick={() =>
                navigate(`/view/nariprofile/${opponent.profileId}`)
              }
            >
              <img src={opponent.profile} alt="profile" />
            </WrapProfile>
            <div className="message-section">
              <div className="nickname">
                {opponent.nickname}{' '}
                {opponent.userType === 'dong' ? '동백' : '나리'}
              </div>
              <div className="message-container">
                <div className="wrapper">
                  <div className="wrapper-top">
                    <div className="message">{message.chatMessage}</div>
                    <div className="read">
                      {message.unreadCount !== 0 ? message.unreadCount : ''}
                    </div>
                  </div>
                  <div className="time">{parseTime(message.createdAt)}</div>
                </div>
              </div>
            </div>
          </MessageByOther>
        );
      case 'SCHEDULE':
        const { date, time, place, alertTime } = JSON.parse(
          message.chatMessage
        );
        return (
          <AlertSchedule
            date={date}
            time={time}
            place={place}
            alertTime={alertTime}
          ></AlertSchedule>
        );
      case 'IMAGE':
        return isSentByMe ? (
          <MessageByMe $userType={opponent.userType}>
            <div className="message-container">
              <div className="wrapper">
                <div className="wrapper-top">
                  <div className="read">
                    {message.unreadCount !== 0 ? message.unreadCount : ''}
                  </div>
                  <img
                    className="message-img"
                    src={message.chatMessage}
                    alt="이미지전송"
                    onClick={viewImage}
                  />
                </div>
                <div className="time">{parseTime(message.createdAt)}</div>
              </div>
            </div>
          </MessageByMe>
        ) : (
          <MessageByOther>
            <WrapProfile
              onClick={() =>
                navigate(`/view/nariprofile/${opponent.profileId}`)
              }
            >
              <img src={opponent.profile} alt="profile" />
            </WrapProfile>
            <div className="message-section">
              <div className="nickname">
                {opponent.nickname}{' '}
                {opponent.userType === 'dong' ? '동백' : '나리'}
              </div>
              <div className="message-container">
                <div className="wrapper">
                  <div className="wrapper-top">
                    <img
                      className="message-img"
                      src={message.chatMessage}
                      alt="이미지전송"
                      onClick={viewImage}
                    />
                    <div className="read">
                      {message.unreadCount !== 0 ? message.unreadCount : ''}
                    </div>
                  </div>
                  <div className="time">{parseTime(message.createdAt)}</div>
                </div>
              </div>
            </div>
          </MessageByOther>
        );
      default:
        return null;
    }
  }
);

const Announcement = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px;

  > .content {
    border-radius: 1.25rem;
    background: var(--Base-Gray, #8e8e8e);
    color: white;

    padding: 0.7rem 1rem;
    text-align: center;

    color: var(--White, #fff);
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.03375rem;
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

interface MessageProp {
  $userType: string;
}

const MessageByMe = styled.div<MessageProp>`
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

      > .wrapper-top {
        display: flex;
        flex-direction: row;
        align-items: end;

        > .read {
          color: var(--Base-Deep-Gray, #5b5b5b);
          font-family: NanumSquare;
          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding-right: 0.5rem;
        }

        > .message {
          width: fit-content;
          max-width: 100%; // 변경: content의 최대 너비를 wrapper에 맞게 조절
          padding: 10px;
          line-height: 1.5;
          overflow-wrap: break-word;
          word-break: break-word;

          border-radius: 0.875rem 0rem 0.875rem 0.875rem;
          background: ${({ $userType }) =>
            $userType === 'dong'
              ? 'var(--Primary-nari)'
              : 'var(--Primary-dong)'};
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
        > .wrapper-top {
          display: flex;
          flex-direction: row;
          align-items: end;

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

          > .read {
            color: var(--Base-Deep-Gray, #5b5b5b);
            font-family: NanumSquare;
            font-size: 1rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            padding-left: 0.5rem;
          }
        }
        > .time {
          color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
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

export default Message;
