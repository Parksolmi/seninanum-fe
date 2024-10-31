import React from 'react';
import styled from 'styled-components';

const TodayTopicBanner = () => {
  return (
    <WrapBanner>
      <div className="title">오늘의 주제</div>
      <p>
        20대에 꼭 이뤄야하는 건 <br />
        뭐라고 생각하시나요?
      </p>
      <p className="background">?</p>
    </WrapBanner>
  );
};

const WrapBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1.1rem 0.8rem;

  border-radius: 0.625rem;
  background: #fff4f4;

  position: relative;

  .title {
    color: var(--Dong-main, #ff314a);
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.0225rem;
  }

  p {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.0275rem;
  }

  .background {
    position: absolute;
    top: 0.5rem;
    right: 1rem;

    transform: rotate(9.454deg);
    color: #ffdcdc;
    font-family: NanumSquare;
    font-size: 7rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.12125rem;
  }
`;

export default TodayTopicBanner;
