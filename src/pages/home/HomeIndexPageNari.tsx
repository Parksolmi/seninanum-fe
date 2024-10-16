import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ShortcutButton from '../../components/home/ShortcutButton';
import FilterButton from '../../components/home/FilterButton';
import MyRecruitProgress from '../../components/home/MyRecruitProgress';
// import ProfileVerticalCard from '../../components/home/ProfileVerticalCard';
import LogoHeader from '../../components/header/LogoHeader';
import { instance } from '../../api/instance';
import SummaryCard from '../../components/common/SummaryCard';
import useRecruitState from '../../store/recruitState';

interface CareerCard {
  profileId: number;
  introduce: string;
  age: string;
  field: string;
  nickname: string;
  gender: string;
  birthyear: string;
  profile: string;
}
const USER_TYPE = 'nari';
const CARD_TYPE = 'dong';

const HomeIndexPageNari: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<CareerCard[]>([]);
  const { setRecruitState } = useRecruitState();
  const navigateToFilter = () => {
    navigate('/filter/career/field');
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

  // 필터링 페이지에서 전달된 데이터를 받음
  useEffect(() => {
    if (location.state && location.state.filteredProfiles) {
      // 필터링된 데이터가 있을 경우 그 데이터를 사용
      setProfile(location.state.filteredProfiles);
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

          setProfile(uniqueProfiles);
        } catch (error) {
          console.log(error);
        }
      };
      getBriefProfile();
    }
  }, [location.state]);

  return (
    <>
      <LogoHeader />
      <BannerContainer>
        <p className="caption">언제나 신나는 배움</p>
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
        <MyRecruitProgress
          myRecruit={0}
          RecruitThisMonth={21}
          navigateToRecruit={() => handleRecruitNavigation()}
        />
        {/* <MyRecruitProgress
          myRecruit={1}
          applicantCount={4}
          recruitTitle="기후기술 창업대회 공모전 도와주실 전문가 분을 찾습니다! 굉장히 어렵네요..."
        /> */}
        <TitleText>간편 바로가기</TitleText>
        <WrapShortcutButtons>
          <ShortcutButton
            navigateTo={() => handleRecruitNavigation()}
            shortcutButtonText={`구인글\n작성하기`}
            type={USER_TYPE}
          ></ShortcutButton>
          <ShortcutButton
            navigateTo={() => navigate('/')}
            shortcutButtonText={`리뷰\n작성하기`}
            type={USER_TYPE}
          ></ShortcutButton>
        </WrapShortcutButtons>
        <TitleText>
          {/* 교육 분야의 <br /> */}
          동백님들을 추천해드릴게요!
        </TitleText>
        {/* <WrapVerticalProfiles>
          {profile &&
            profile.map((profile) => (
              <ProfileVerticalCard
                types={CARD_TYPE}
                key={profile.profileId}
                nickname={profile.nickname}
                age={calcAge(profile.birthyear)}
                gender={profile.gender === 'F' ? '여자' : '남자'}
                tagText="리뷰 좋음"
                introduce={profile.introduce}
                naviagateTo={() =>
                  navigate(`/view/profile/career/${profile.profileId}`)
                }
              />
            ))}
        </WrapVerticalProfiles> */}

        <TitleText>원하는 동백님을 직접 찾아봐요!</TitleText>
        <FilterButton onClick={navigateToFilter} />
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
                  //수정
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
    color: var(--Nari-Nari-Text, #464646);
    font-family: NanumSquare;
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 800;
    line-height: 2.2rem; /* 160% */
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

const WrapShortcutButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

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
