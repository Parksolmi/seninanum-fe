import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyRecruitProgress from '../../components/home/MyRecruitProgress';
// import ProfileVerticalCard from '../../components/home/ProfileVerticalCard';
import LogoHeader from '../../components/header/LogoHeader';
import { instance } from '../../api/instance';
import SummaryCard from '../../components/common/SummaryCard';
import useRecruitState from '../../store/recruitState';

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
interface RecruitStatusProps {
  recruitId: number;
  title: string;
  applicantCount: number;
}

const CARD_TYPE = 'dong';

const HomeIndexPageNari: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CareerCard[]>([]);
  const [latestRecruit, setLatestRecruit] = useState<RecruitStatusProps | null>(
    null
  );
  const { setRecruitState } = useRecruitState();
  const navigateToManageRecruit = () => {
    navigate('/manage/myrecruit');
  };
  // recruitState 초기화 후 페이지 이동 함수
  const handleRecruitNavigation = () => {
    // recruitState 초기화
    setRecruitState({
      recruitId: '',
      title: '',
      content: '',
      price: 0,
      priceType: '',
      method: '',
      region: '',
      field: '',
    });

    // 페이지 이동
    navigate('/register/recruit/field');
  };

  // 최신 구인글을 불러오는 함수
  const fetchLatestRecruit = async () => {
    try {
      const res = await instance.get('/recruit/mylist', {
        params: { status: '모집중' }, // 모집 중인 최신 구인글
      });
      if (res.data.length > 0) {
        const sortedRecruits = res.data.sort(
          (a, b) => b.recruitId - a.recruitId
        );

        // 가장 최신 구인글 하나를 기본으로 설정
        const latest = sortedRecruits[0];
        setLatestRecruit({
          recruitId: latest.recruitId,
          title: latest.title,
          applicantCount: latest.applicantCount,
        });
      }
    } catch (error) {
      console.error('Failed to fetch latest recruit:', error);
    }
  };

  // 동백 프로필 조회
  useEffect(() => {
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

        setProfile(uniqueProfiles);
      } catch (error) {
        console.log(error);
      }
    };
    getBriefProfile();
    fetchLatestRecruit();
  }, []);

  return (
    <>
      <LogoHeader />
      <BannerContainer>
        <p className="caption">지식나눔을 통한 신나는 배움</p>
        <div className="main">
          동백들이
          <br /> 나리님을
          <br /> 기다리고 있어요!
          <img
            className="arrow"
            src="/assets/common/long-arrow-gray.png"
            alt="arrow"
          />
          <img
            className="character"
            src="/assets/home/home-nari.png"
            alt="character"
          />
        </div>
      </BannerContainer>
      <WrapContent>
        {latestRecruit ? (
          <MyRecruitProgress
            myRecruit={true}
            applicantCount={latestRecruit.applicantCount}
            recruitTitle={latestRecruit.title}
            navigateToManange={() => navigateToManageRecruit()}
          />
        ) : (
          <MyRecruitProgress
            myRecruit={false}
            navigateToRecruit={() => handleRecruitNavigation()}
          />
        )}

        <TitleText>신규 전문가를 만나보세요!</TitleText>
        {/* <FilterButton onClick={navigateToFilter} /> */}
        <WrapDongCards>
          {profile.length > 0 ? (
            profile.map((profileItem) => (
              <SummaryCard
                key={profileItem.profileId}
                type={CARD_TYPE}
                profile={profileItem.profile}
                fields={profileItem.field ? profileItem.field.split(',') : []}
                nickname={profileItem.nickname}
                content={profileItem.introduce}
                age={profileItem.birthyear}
                gender={
                  profileItem.gender === 'F' || profileItem.gender === '여성'
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
      </WrapContent>
    </>
  );
};

const BannerContainer = styled.div`
  padding: 2rem 1.1rem 2rem 1.1rem;
  position: relative;
  overflow: hidden;

  .caption {
    color: var(--Primary-Deep-nari, #f48400);
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .main {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.5625rem;
    font-weight: 800;
    line-height: 2.5rem; /* 160% */
    letter-spacing: -0.01563rem;
    margin-top: 1.2rem;

    .arrow {
      width: 1.9rem;
      margin-left: 0.3rem;
    }

    .character {
      position: absolute;
      top: 2rem;
      right: -1rem;
      width: 10rem;
    }
  }
`;

const WrapContent = styled.div`
  padding: 0 1.1rem 2rem 1.1rem;
  margin-bottom: 2rem;
`;

const TitleText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.06rem;
  margin-top: 2.6rem;
  margin-bottom: 1rem;
`;

// const WrapShortcutButtons = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const WrapVerticalProfiles = styled.div`
//   display: flex;
//   gap: 1rem;
//   padding: 0.3rem 0.5rem 0.5rem 0.5rem;
//   overflow-x: auto;
//   white-space: nowrap;
// `;

const WrapDongCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;
export default HomeIndexPageNari;
