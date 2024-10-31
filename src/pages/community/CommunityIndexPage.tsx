import React from 'react';
import styled from 'styled-components';
import TitleHeader from '../../components/header/TitleHeader';
import BoothEventBanner from '../../components/community/BoothEventBanner';
import TodayTopicBanner from '../../components/community/TodayTopicBanner';
import { useNavigate } from 'react-router-dom';

const CommunityIndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <TitleHeader title="소통" isShowAlert={true} />

      <>
        <WrapBanner>
          <BoothEventBanner />
          <TodayTopicBanner />
        </WrapBanner>
        <SplitLine />

        <WrapCommunity>
          <WrapSingleCommunity>
            <div className="title">
              <h1>자유게시판</h1>
              <p
                className="more-button"
                onClick={() => navigate('/community/free')}
              >
                더보기
              </p>
            </div>
            <div className="content">
              <p className="content-title">우리집 강아지 사진</p>
              <p className="content-title">
                은퇴 후 새롭게 도전해보면 좋은 것들 리스트 100
              </p>
              <p className="content-title">여행 가서 찍은 사진 공유</p>
            </div>
          </WrapSingleCommunity>
          <SmallSplitLine />
          <WrapSingleCommunity>
            <div className="title">
              <h1>고민상담</h1>
              <p
                className="more-button"
                onClick={() => navigate('/community/advice')}
              >
                더보기
              </p>
            </div>
            <div className="content">
              <p className="content-title">
                새로운 직장에서 적응이 너무 어려워요..
              </p>
              <p className="content-title">
                인생 선배님들, 인간관계 스트레스 어떻게 해결하시나요?
              </p>
              <p className="content-title">
                결혼을 앞두고 있는데 실질적인 조언이 필요해요
              </p>
            </div>
          </WrapSingleCommunity>
        </WrapCommunity>
      </>
    </>
  );
};

const WrapBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.3rem 1.1rem;
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 0 0 1.3rem 0;
`;

const SmallSplitLine = styled.div`
  background: #ebeceb;
  height: 0.2rem;
  margin: 0.5rem 0 0.5rem 0;
`;

const WrapCommunity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.1rem;
`;

const WrapSingleCommunity = styled.div`
  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  h1 {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.03rem;
  }

  .more-button {
    color: var(--Base-Deep-Gray, #5b5b5b);
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.03375rem;
    text-decoration-line: underline;
  }

  .content {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .content-title {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.025rem;
  }
`;
export default CommunityIndexPage;
