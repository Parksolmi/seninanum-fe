import React from 'react';
import styled from 'styled-components';
import CareerProfileProgress from './../../components/home/CareerProfileProgress';
import ShortcutButton from './../../components/common/ShortcutButton';
import SummaryCard from '../../components/common/SummaryCard';

const HomeIndexPageDong: React.FC = () => {
  return (
    <>
      <LogoImg src="/assets/common/seni-text-logo.svg" alt="logo" />
      <BannerContainer
        src="/assets/home/home-banner2.png"
        alt="배너이미지"
      ></BannerContainer>
      <WrapContent>
        <CareerProfileProgress status={0}></CareerProfileProgress>
        <TitleText>간편 바로가기</TitleText>
        <ButtonHorizontal>
          <ShortcutButton
            shortcutButtonText={`구인글\n조회하기`}
            type="dong"
          ></ShortcutButton>
          <ShortcutButton
            shortcutButtonText={`리뷰\n작성하기`}
            type="dong"
          ></ShortcutButton>
        </ButtonHorizontal>
        <TitleText>추천 구인글</TitleText>
        <NariCardVertical>
          <SummaryCard
            type={'nari'}
            fields={['IT', '예체능', '디지털']}
          ></SummaryCard>
          <SummaryCard type={'nari'} fields={['IT', '예체능']}></SummaryCard>
          <SummaryCard type={'nari'} fields={['IT']}></SummaryCard>
          <SummaryCard type={'nari'} fields={['IT', '취업']}></SummaryCard>
          <SummaryCard
            type={'nari'}
            fields={['입시', '경제', '교육']}
          ></SummaryCard>
        </NariCardVertical>
      </WrapContent>
    </>
  );
};

const LogoImg = styled.img`
  position: absolute;
  top: 2rem;
  left: 17.6px;
  z-index: 999;
  object-fit: contain;
`;

const BannerContainer = styled.img`
  object-fit: contain;
  width: 100%;
`;

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const TitleText = styled.div`
  color: var(--Base-Black, #000);
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
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

export default HomeIndexPageDong;
