import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ShortcutButton from '../../components/home/ShortcutButton';
import SummaryCard from '../../components/common/SummaryCard';
import FilterButton from '../../components/home/FilterButton';
import MyRecruitProgress from '../../components/home/MyRecruitProgress';
import ProfileVerticalCard from '../../components/home/ProfileVerticalCard';
import LogoHeader from '../../components/header/LogoHeader';
import { instance } from '../../api/instance';
import { calcAge } from '../../utils/calcAge';

interface CareerCard {
  profileId: number;
  introduce: string;
  age: string;
  field: string;
  nickname: string;
  gender: string;
  birthyear: string;
}
const USER_TYPE = 'nari';
const CARD_TYPE = 'dong';

const HomeIndexPageNari = () => {
  const navigate = useNavigate();
  //const { profileId } = useParams<{ profileId: string }>();

  const [profile, setProfile] = useState<CareerCard[]>([]);

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
        console.log(uniqueProfiles);
      } catch (error) {
        console.log(error);
      }
    };
    getBriefProfile();
  }, []);
  return (
    <>
      <LogoHeader />
      <BannerContainer
        src="/assets/home/home-banner2.png"
        alt="배너이미지"
      ></BannerContainer>
      <WrapContent>
        <MyRecruitProgress
          myRecruit={0}
          RecruitThisMonth={21}
          navigateToRecruit={() => navigate('/register/recruit/field')}
        />
        {/* <MyRecruitProgress
          myRecruit={1}
          applicantCount={4}
          recruitTitle="기후기술 창업대회 공모전 도와주실 전문가 분을 찾습니다! 굉장히 어렵네요..."
        /> */}
        <TitleText>간편 바로가기</TitleText>
        <WrapShortcutButtons>
          <ShortcutButton
            navigateTo={() => navigate('/register/recruit/field')}
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
        <WrapVerticalProfiles>
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
        </WrapVerticalProfiles>

        <TitleText>원하는 동백님을 직접 찾아봐요!</TitleText>
        <FilterButton />
        <WrapDongCards>
          <SummaryCard
            type={CARD_TYPE}
            fields={['IT', '예체능', '디지털']}
          ></SummaryCard>
          <SummaryCard type={CARD_TYPE} fields={['IT', '예체능']}></SummaryCard>
          <SummaryCard type={CARD_TYPE} fields={['IT']}></SummaryCard>
          <SummaryCard type={CARD_TYPE} fields={['IT', '취업']}></SummaryCard>
          <SummaryCard
            type={CARD_TYPE}
            fields={['입시', '경제', '교육']}
          ></SummaryCard>
        </WrapDongCards>
      </WrapContent>
    </>
  );
};

const BannerContainer = styled.img`
  object-fit: contain;
  width: 100%;
`;

const WrapContent = styled.div`
  padding: 0 1.1rem 2rem 1.1rem;
  margin-bottom: 2rem;
`;

const TitleText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -0.075rem;
  margin-top: 2.6rem;
  margin-bottom: 1rem;
`;

const WrapShortcutButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const WrapVerticalProfiles = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem 0.5rem 0.5rem 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
`;

const WrapDongCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;
export default HomeIndexPageNari;
