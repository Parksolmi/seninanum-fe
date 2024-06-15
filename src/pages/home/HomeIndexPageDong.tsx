import React from 'react';
import styled from 'styled-components';
import CareerProfileProgress from './../../components/home/CareerProfileProgress';
import ShortcutButton from './../../components/common/ShortcutButton';
import SummaryCard from '../../components/common/SummaryCard';
import { useNavigate } from 'react-router-dom';

const USER_TYPE = 'dong';
const CARD_TYPE = 'nari';

const HomeIndexPageDong: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <BannerContainer
        src="/assets/home/home-banner.svg"
        alt="배너이미지"
      ></BannerContainer>
      <WrapContent>
        <CareerProfileProgress status={0}></CareerProfileProgress>
        <TitleText>간편 바로가기</TitleText>
        <ButtonHorizontal>
          <ShortcutButton
            navigateTo={() => navigate('/')}
            shortcutButtonText={`구인글\n조회하기`}
            type={USER_TYPE}
          ></ShortcutButton>
          <ShortcutButton
            navigateTo={() => navigate('/')}
            shortcutButtonText={`리뷰\n작성하기`}
            type={USER_TYPE}
          ></ShortcutButton>
        </ButtonHorizontal>
        <TitleText>추천 구인글</TitleText>
        <NariCardVertical>
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
