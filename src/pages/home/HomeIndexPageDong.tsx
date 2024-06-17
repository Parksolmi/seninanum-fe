import React from 'react';
import styled from 'styled-components';
import CareerProfileProgress from './../../components/home/CareerProfileProgress';
import ShortcutButton from '../../components/home/ShortcutButton';
import { useNavigate } from 'react-router-dom';
import LogoHeader from '../../components/header/LogoHeader';
import SummaryCard from '../../components/common/SummaryCard';

const USER_TYPE = 'dong';
// const CARD_TYPE = 'nari';

const HomeIndexPageDong: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <LogoHeader />
      <BannerContainer
        src="/assets/home/home-banner.png"
        alt="배너이미지"
      ></BannerContainer>

      <ContentContainer>
        <CareerProfileProgress status={0} />
        <TitleText>간편 바로가기</TitleText>
        <ButtonHorizontal>
          <ShortcutButton
            shortcutButtonText={`구인글\n조회하기`}
            navigateTo={() => navigate('/view/recruit/list')}
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
          {/* 임시 */}
          <SummaryCard
            type={'nari'}
            fields={['IT', '예체능', '디지털']}
          ></SummaryCard>
          <SummaryCard
            type={'nari'}
            fields={['IT', '예체능', '디지털']}
          ></SummaryCard>
        </NariCardVertical>
      </ContentContainer>
    </>
  );
};

const BannerContainer = styled.img`
  object-fit: contain;
  width: 100%;
`;

const ContentContainer = styled.div`
  padding: 0 1.1rem 2rem 1.1rem;
`;

const TitleText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 800;
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
