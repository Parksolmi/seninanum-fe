import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import userTypeStore from '../../store/userState';
import TitleHeader from '../../components/header/TitleHeader';
import { parseTime } from '../../utils/formatTime';

interface ChatRoom {
  chatRoomId: number;
  profile: string;
  roomName: string;
  roomStatus: string;
  lastMessage: string;
  createdAt: string; //lastMessageAt으로 수정
  unreadCount: number;
}

const ChatIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = userTypeStore();
  const [chatList, setChatList] = useState<ChatRoom[]>([]);

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await instance.get('/chatroom/list');
        setChatList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatList();
  }, []);

  return (
    <>
      <TitleHeader title="채팅" isShowAlert={false} />
      <WrapContent>
        <ChatListContainer>
          {chatList &&
            chatList.map((chat) => {
              const timeDisplay = chat.createdAt
                ? parseTime(chat.createdAt)
                : '(알수없음)';

              return (
                <ChatRoomContainer
                  key={chat.chatRoomId}
                  onClick={() =>
                    navigate(`/chatroom/${userType}/${chat.chatRoomId}`)
                  }
                >
                  <ProfileImg>
                    <img src={chat.profile} alt="profile" />
                  </ProfileImg>
                  <WrapChatSection>
                    <div className="top">
                      <Profile>
                        <div className="department">{chat.roomName} 동백</div>
                      </Profile>
                      <Time>{timeDisplay}</Time>
                    </div>
                    <div className="bottom">
                      <Message>{chat.lastMessage}</Message>
                      {chat.unreadCount > 0 ? (
                        <UnreadCount>{chat.unreadCount}</UnreadCount>
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
    width: 3.5rem;
    height: 3.5rem;
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
