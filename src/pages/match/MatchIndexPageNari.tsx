import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomizedNariCard from '../../components/match/CustomizedNariCard';
import FilterButton from './../../components/home/FilterButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../../api/instance';
import SummaryCard from '../../components/common/SummaryCard';
import ViewMyApplicantsList from './ViewMyApplicantsList';
import { calcAge } from '../../utils/calcAge';

interface CareerCard {
  careerProfileId: number;
  profileId: number;
  introduce: string;
  age: string;
  field: string;
  nickname: string;
  gender: string;
  birthyear: string;
  profile: string;
}

interface MatchDong {
  field: string;
  recommendation: CareerCard;
}

const MatchIndexPageNari = ({ userType }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [profiles, setProfiles] = useState<CareerCard[]>([]);
  const [matchDongList, setMatchDongList] = useState<MatchDong[]>([]);

  // 1.맞춤형 추천, 2.지원자 목록
  const [activeTab, setActiveTab] = useState(1);

  // 필터링 페이지에서 전달된 데이터를 받음
  useEffect(() => {
    if (location.state && location.state.filteredProfiles) {
      // 필터링된 데이터가 있을 경우 그 데이터를 사용
      setProfiles(location.state.filteredProfiles);
    } else {
      // 필터링된 데이터가 없을 경우 기본 career/list 데이터를 불러옴
      const getBriefProfile = async () => {
        try {
          const res = await instance.get('/career/list');
          // 중복 제거 로직
          const uniqueProfiles: CareerCard[] = [];
          const seenNicknames = new Set<string>();

          res.data.forEach((profile: CareerCard) => {
            if (!seenNicknames.has(profile.nickname)) {
              seenNicknames.add(profile.nickname);
              uniqueProfiles.push(profile);
            }
          });

          setProfiles(uniqueProfiles);
        } catch (error) {
          console.log(error);
        }
      };
      getBriefProfile();
    }
  }, [location.state]);

  // 맞춤형 동백 추천
  useEffect(() => {
    const handleMatchDong = async () => {
      try {
        const res = await instance.get('/match/dong');
        setMatchDongList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleMatchDong();
  }, []);

  return (
    <>
      <Tab>
        <p
          onClick={() => setActiveTab(1)}
          className={activeTab === 1 ? 'active' : ''}
        >
          맞춤형 추천
        </p>
        <p
          onClick={() => setActiveTab(2)}
          className={activeTab === 2 ? 'active' : ''}
        >
          지원자 목록
        </p>
      </Tab>
      <WrapContentSingle>
        {activeTab === 1 && (
          <>
            <CustomizedCardArea>
              {matchDongList.length > 0 &&
                matchDongList.map((matchDong) =>
                  matchDong.recommendation ? (
                    <CustomizedNariCard
                      key={matchDong.field}
                      field={matchDong.field}
                      profile={matchDong.recommendation.profile}
                      nickname={matchDong.recommendation.nickname}
                      age={calcAge(matchDong.recommendation.birthyear)}
                      gender={matchDong.recommendation.gender}
                    />
                  ) : (
                    <CustomizedNariCard
                      key={matchDong.field}
                      field={matchDong.field}
                      isExist={false}
                    />
                  )
                )}
            </CustomizedCardArea>

            <FilterButton onClick={() => navigate('/match/field')} />
            <WrapDongCards>
              {profiles.length > 0 ? (
                profiles.map((profileItem) => (
                  <SummaryCard
                    key={profileItem.profileId}
                    type={'dong'}
                    profile={profileItem.profile}
                    fields={
                      profileItem.field ? profileItem.field.split(',') : []
                    }
                    nickname={profileItem.nickname}
                    content={profileItem.introduce}
                    age={profileItem.birthyear}
                    gender={
                      profileItem.gender === 'F' ||
                      profileItem.gender === '여성'
                        ? '여성'
                        : '남성'
                    }
                    onClick={() =>
                      navigate(`/view/dongprofile/${profileItem.profileId}`)
                    }
                  />
                ))
              ) : (
                <p>추천할 동백님이 없습니다.</p>
              )}
            </WrapDongCards>
          </>
        )}
        {activeTab === 2 && <ViewMyApplicantsList />}
      </WrapContentSingle>
    </>
  );
};

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.8rem;
  p {
    color: #414040;
    text-align: center;
    font-size: 1.375rem;
    letter-spacing: 0.0275rem;
    font-family: NanumSquare;
    font-weight: 500;
    position: relative;
    &.active {
      color: #ffaa0e;
      font-family: NanumSquare;
      font-weight: 700;
    }

    &.active::after {
      content: '';
      display: block;
      width: 7.625rem;
      height: 0.25rem;
      background-color: #ffd111;
      position: absolute;
      bottom: -0.6rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;
`;

const CustomizedCardArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

const WrapDongCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export default MatchIndexPageNari;
