import React from 'react';
import styled from 'styled-components';
import ShortcutButton from '../../components/common/ShortcutButton';
import SummaryCard from '../../components/common/SummaryCard';
import MyRecruitProgress from '../../components/home/MyRecruitProgress';
import ProfileVerticalCard from '../../components/home/ProfileVerticalCard';

const TYPE = 'nari';

const HomeIndexPageNari: React.FC = () => {
  return (
    <>
      <BannerContainer
        src="/assets/home/home-banner2.svg"
        alt="배너이미지"
      ></BannerContainer>
      <WrapContent>
        {/* <MyRecruitProgress myRecruit={0} RecruitThisMonth={21} /> */}
        <MyRecruitProgress
          myRecruit={1}
          applicantCount={4}
          recruitTitle="기후기술 창업대회 공모전 도와주실 전문가 분을 찾습니다! 굉장히 어렵네요..."
        />
        <TitleText>간편 바로가기</TitleText>
        <ButtonHorizontal>
          <ShortcutButton
            shortcutButtonText={`구인글\n작성하기`}
            type={TYPE}
          ></ShortcutButton>
          <ShortcutButton
            shortcutButtonText={`리뷰\n작성하기`}
            type={TYPE}
          ></ShortcutButton>
        </ButtonHorizontal>
        <TitleText>
          교육•예체능•디지털 분야의 <br />
          동백님들을 추천해드릴게요!
        </TitleText>
        <WrapVerticalProfiles>
          <ProfileVerticalCard
            nickname={'닉네임'}
            types="dong"
            age="60대"
            gender="여자"
            tagText="경력많음"
          />
          <ProfileVerticalCard
            nickname={'닉네임'}
            types="dong"
            age="60대"
            gender="여자"
            tagText="경력많음"
          />
          <ProfileVerticalCard
            nickname={'닉네임'}
            types="dong"
            age="60대"
            gender="여자"
            tagText="경력많음"
          />
          <ProfileVerticalCard
            nickname={'닉네임'}
            types="dong"
            age="60대"
            gender="여자"
            tagText="경력많음"
          />
        </WrapVerticalProfiles>

        <TitleText>추천 구인글</TitleText>
        <NariCardVertical>
          <SummaryCard
            type={TYPE}
            fields={['IT', '예체능', '디지털']}
          ></SummaryCard>
          <SummaryCard type={TYPE} fields={['IT', '예체능']}></SummaryCard>
          <SummaryCard type={TYPE} fields={['IT']}></SummaryCard>
          <SummaryCard type={TYPE} fields={['IT', '취업']}></SummaryCard>
          <SummaryCard
            type={TYPE}
            fields={['입시', '경제', '교육']}
          ></SummaryCard>
        </NariCardVertical>
      </WrapContent>
    </>
  );
};

const BannerContainer = styled.img`
  object-fit: cover;
  width: 100%;
  height: 22.5rem;
`;

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
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

const ButtonHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const NariCardVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WrapVerticalProfiles = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem 0.5rem 0.5rem 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
`;

export default HomeIndexPageNari;
