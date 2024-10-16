import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import userTypeStore from '../../store/userState';
import TitleHeader from '../../components/header/TitleHeader';
import { parseTime } from '../../utils/formatTime';
import ApplicationCard from '../../components/chat/ApplicationCard';
import { calcAge } from '../../utils/calcAge';

interface ChatRoom {
  chatRoomId: number;
  profile: string;
  userType: string;
  roomName: string;
  roomStatus: string;
  lastMessage: string;
  createdAt: string; //lastMessageAt으로 수정
  unreadCount: number;
}

interface Application {
  recruitId: number;
  title: string;
  nickname: string;
  profile: string;
}

interface Volunteers {
  profileId: string;
  profile: string;
  nickname: string;
  gender: string;
  birthyear: string;
}

const ChatIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = userTypeStore();
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteers[]>([]);
  const [chatList, setChatList] = useState<ChatRoom[]>([]);

  // (동백)지원한 구인글 목록 불러오기
  useEffect(() => {
    const fetchApplications = async () => {
      if (userType !== 'dong') return;
      try {
        const res = await instance.get('application/recruit/list');
        setApplicationList(res.data);
      } catch (error) {
        console.error('지원한 구인글 조회 중 오류 발생:', error);
      }
    };
    fetchApplications();
  }, [userType]);

  // (나리) 지원자 목록 불러오기
  useEffect(() => {
    const fetchVolunteers = async () => {
      if (userType !== 'nari') return;

      try {
        const res = await instance.get('application/list');
        const uniqueVolunteers = filterUniqueByProfileId(res.data);
        setVolunteers(uniqueVolunteers);
      } catch (error) {
        console.error('지원자 목록 조회 중 오류 발생:', error);
      }
    };

    fetchVolunteers();
  }, [userType]);

  // profileId로 중복 항목 제거하는 함수
  const filterUniqueByProfileId = (volunteers: Volunteers[]) => {
    const seen = new Set(); // 중복 체크용 Set
    return volunteers.filter((volunteer) => {
      const isDuplicate = seen.has(volunteer.profileId);
      seen.add(volunteer.profileId);
      return !isDuplicate;
    });
  };

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
        {applicationList.length > 0 && (
          <ApplicationListContainer>
            <ApplicationTextArea>
              <div className="leftText">
                <p>내가 지원한 공고</p>
                <span>{applicationList.length}</span>
              </div>
              <div
                className="moreButton"
                onClick={() => navigate(`/manage/myapplication?tab=1`)}
              >
                더보기
                <img src="/assets/common/more-icon.svg" alt="더보기아이콘" />
              </div>
            </ApplicationTextArea>
            <SwipeArea>
              {applicationList.map((application) => (
                <ApplicationCard
                  userType="dong"
                  key={application.recruitId}
                  profile={application.profile}
                  nickname={application.nickname}
                  title={application.title}
                  onClick={() =>
                    navigate(`/view/recruit/${application.recruitId}`)
                  }
                />
              ))}
            </SwipeArea>
          </ApplicationListContainer>
        )}
        {volunteers.length > 0 && (
          <ApplicationListContainer>
            <ApplicationTextArea>
              <div className="content-title">
                <p>나에게 지원한 동백</p>
                <span>{volunteers.length}</span>
              </div>
              <div className="moreButton" onClick={() => navigate(`/chat`)}>
                더보기
                <img src="/assets/common/more-icon.svg" alt="더보기아이콘" />
              </div>
            </ApplicationTextArea>
            <SwipeArea>
              {volunteers.map((volunteer) => (
                <ApplicationCard
                  userType="nari"
                  key={volunteer.profileId}
                  profile={volunteer.profile}
                  nickname={volunteer.nickname}
                  gender={volunteer.gender}
                  birthyear={calcAge(volunteer.birthyear)}
                  onClick={() =>
                    navigate(`/view/dongprofile/${volunteer.profileId}`)
                  }
                />
              ))}
            </SwipeArea>
          </ApplicationListContainer>
        )}
      </WrapContent>
      {(applicationList.length > 0 || volunteers.length > 0) && <SplitLine />}
      <WrapContent>
        <div className="content-title">
          <p>채팅 목록</p>
        </div>
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
                        <div className="department">
                          {chat.roomName}{' '}
                          {chat.userType === 'dong' ? '동백' : '나리'}
                        </div>
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

  > .content-title {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
    margin: 0;
  }
`;

const ApplicationListContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ApplicationTextArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .leftText {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  p {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
    margin: 0;
  }

  span {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
  }

  .moreButton {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  img {
    width: 1rem;
    height: 1rem;
  }
`;

const SwipeArea = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto; /* 가로 스크롤 허용 */
  white-space: nowrap;
  padding-bottom: 0.5rem;
  margin-right: -1.1rem;
  padding-right: 1.1rem; /* 마지막 카드가 잘리지 않도록 여백 추가 */

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
`;

const SplitLine = styled.div`
  width: 100%;
  height: 0.625rem;
  background: #ebeceb;
  margin: 1rem 0;
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
