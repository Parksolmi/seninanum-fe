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
      <BannerContainer>
        <p className="caption">은퇴 이후 신나는 일상</p>
        <div className="main">
          동백님이
          <br /> 나리님을
          <br /> 기다리고 있어요!
          <img
            className="arrow"
            src="/assets/common/long-arrow-gray.png"
            alt="arrow"
          />
          <img
            className="character"
            src="/assets/home/home-dong.png"
            alt="character"
          />
        </div>
      </BannerContainer>

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

const BannerContainer = styled.div`
  padding: 2rem 1.1rem 2rem 1.1rem;
  position: relative;
  overflow: hidden;

  .caption {
    color: var(--Primary-dong, #ff314a);
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

const ContentContainer = styled.div`
  padding: 0 1.1rem 2rem 1.1rem;
`;

const TitleText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.06rem;
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
