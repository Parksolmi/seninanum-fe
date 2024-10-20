import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import ApplicationCard from '../../components/chat/ApplicationCard';
import { calcAge } from '../../utils/calcAge';

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

const MatchIndexPageDong = ({ userType }) => {
  const navigate = useNavigate();
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteers[]>([]);

  // profileId로 중복 항목 제거하는 함수
  const filterUniqueByProfileId = (volunteers: Volunteers[]) => {
    const seen = new Set(); // 중복 체크용 Set
    return volunteers.filter((volunteer) => {
      const isDuplicate = seen.has(volunteer.profileId);
      seen.add(volunteer.profileId);
      return !isDuplicate;
    });
  };

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

  return (
    <>
      <WrapContent>
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

        {volunteers.length > 0 && (
          <ApplicationListContainer>
            <ApplicationTextArea>
              <div className="content-title">
                <p>나에게 지원한 동백</p>
                <span>{volunteers.length}</span>
              </div>
              <div
                className="moreButton"
                onClick={() => navigate(`/view/myapplicants`)}
              >
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
      <SplitLine />
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
    display: inline;
  }

  span {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
    margin-left: 0.3rem;
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

export default MatchIndexPageDong;
