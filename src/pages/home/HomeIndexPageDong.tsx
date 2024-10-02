import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CareerProfileProgress from './../../components/home/CareerProfileProgress';
import ShortcutButton from '../../components/home/ShortcutButton';
import { useNavigate } from 'react-router-dom';
import LogoHeader from '../../components/header/LogoHeader';
import SummaryCard from '../../components/common/SummaryCard';
import { instance } from '../../api/instance';

const USER_TYPE = 'dong';
// const CARD_TYPE = 'nari';

interface progressStepProps {
  progressStep: number;
}

interface Recruit {
  recruitId: number;
  title: string;
  content: string;
  nickname: string;
  birthyear: string;
  method: string;
  region: string;
  field: string;
}

const HomeIndexPageDong: React.FC<progressStepProps> = ({ progressStep }) => {
  const navigate = useNavigate();
  const [recruitList, setRecruitList] = useState<Recruit[]>([]);

  useEffect(() => {
    const getRecruitList = async () => {
      try {
        const res = await instance.get('/recruit/list');
        setRecruitList(res.data.reverse());
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecruitList();
  }, []);

  return (
    <>
      <LogoHeader />
      <BannerContainer
        src={`/assets/home/banner-image-dong.png`}
        alt="배너이미지"
      />

      <ContentContainer>
        <CareerProfileProgress progressStep={progressStep} />
        <TitleText>간편 바로가기</TitleText>
        <ButtonHorizontal>
          <ShortcutButton
            shortcutButtonText={`구인글\n조회하기`}
            navigateTo={() => navigate('/view/recruit/list')}
            type={USER_TYPE}
          />
          <ShortcutButton
            navigateTo={() => navigate('/')}
            shortcutButtonText={`리뷰\n작성하기`}
            type={USER_TYPE}
          />
        </ButtonHorizontal>

        <TitleText>추천 구인글</TitleText>
        <NariCardVertical>
          {/* 추후 infinite scroll 적용 */}
          {recruitList.map((recruit) => (
            <SummaryCard
              key={recruit.recruitId}
              type={'nari'}
              nickname={recruit.nickname}
              fields={recruit.field.split(',')}
              age={recruit.birthyear}
              method={recruit.method}
              content={recruit.content}
              onClick={() => navigate(`/view/recruit/${recruit.recruitId}`)}
            />
          ))}
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
  margin-bottom: 2rem;
`;

export default HomeIndexPageDong;
