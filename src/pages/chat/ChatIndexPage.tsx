import React from 'react';
import styled from 'styled-components';
// import userTypeStore from '../../store/userState';
import TitleHeader from '../../components/header/TitleHeader';
import { formatTime } from '../../utils/formatTime';

const ChatIndexPage: React.FC = () => {
  // const { userType } = userTypeStore();

  const chatList = [
    {
      askedCount: 2,
      profile: '/assets/common/badge-dong.png',
      chatRoomId: 25,
      createDt: '2024-09-26T22:12:30.509349',
      nickname: '000 나리',
      lastMessage: '마지막 메세지',
      modifyDt: '2024-09-26T22:12:30.509349',
      opponentMemberId: 49,
    },
    {
      askedCount: 12,
      profile: '/assets/common/badge-dong.png',
      chatRoomId: 26,
      createDt: '2024-09-26T22:12:30.509349',
      nickname: '000 나리',
      lastMessage:
        '마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지',
      modifyDt: '2024-09-26T22:12:30.509349',
      opponentMemberId: 49,
    },
    {
      askedCount: 2,
      profile: '/assets/common/badge-dong.png',
      chatRoomId: 27,
      createDt: '2024-09-26T22:12:30.509349',
      nickname: '000 나리',
      lastMessage: '마지막 메세지',
      modifyDt: '2024-09-26T22:12:30.509349',
      opponentMemberId: 49,
    },
  ];

  return (
    <>
      <TitleHeader title="채팅" isShowAlert={false} />
      <WrapContent>
        <ChatListContainer>
          {chatList &&
            chatList.map((chat) => {
              const timeDisplay = chat.modifyDt
                ? formatTime(chat.modifyDt)
                : '(알수없음)';

              return (
                <ChatRoomContainer key={chat.chatRoomId}>
                  <ProfileImg>
                    <img src={chat.profile} alt="profile" />
                  </ProfileImg>
                  <WrapChatSection>
                    <div className="top">
                      <Profile>
                        <div className="department">{chat.nickname}</div>
                      </Profile>
                      <Time>{timeDisplay}</Time>
                    </div>
                    <div className="bottom">
                      <Message>{chat.lastMessage}</Message>
                      {chat.askedCount > 0 ? (
                        <UnreadCount>{chat.askedCount}</UnreadCount>
                      ) : (
                        <br />
                      )}
                    </div>
                  </WrapChatSection>
                </ChatRoomContainer>
              );
            })}
        </ChatListContainer>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 0.3rem 1.1rem;
`;

const ChatListContainer = styled.div`
  margin-bottom: 10rem;
`;

const ChatRoomContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  text-decoration-line: none;
  padding: 16px 0;

  > .profile-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
    min-width: 0;
    flex-grow: 1;
  }

  > .right-section {
    display: flex;
    gap: 12px;
    flex-direction: column;
    flex-shrink: 0;
    align-items: flex-end;
  }
`;

const ProfileImg = styled.div`
  img {
    width: 3.375rem;
    height: 3.375rem;
    object-fit: cover;
    border-radius: 50%;
    background: #c0c0c0;
  }
`;

const Profile = styled.div`
  color: #000000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 400;
  position: relative;

  .department {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const WrapChatSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
  width: 100%;

  .top,
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Message = styled.div`
  color: #5b5b5b;
  font-size: 1.125rem;
  font-family: NanumSquare;
  font-weight: 400;
  /* width: 250px; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: normal;
  flex-grow: 1;
  max-width: 220px;
`;

const Time = styled.div`
  color: #000;
  text-align: right;
  font-weight: 400;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  line-height: normal;
`;

const UnreadCount = styled.span`
  background-color: #ff314a;
  color: #ffffff;
  font-family: NanumSquare;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.0625rem;
  font-weight: 400;
  text-shadow: 2px 1px 4px rgba(0, 0, 0, 0.25);
  padding: 0;
`;

export default ChatIndexPage;
