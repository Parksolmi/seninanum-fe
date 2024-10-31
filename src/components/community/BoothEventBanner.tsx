import React from 'react';
import styled from 'styled-components';

const BoothEventBanner = () => {
  return (
    <WrapBanner>
      <div className="title">전시 부스 이벤트</div>
      <p>노하우를 뽑아보세요!</p>
    </WrapBanner>
  );
};

const WrapBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1.1rem 0.8rem;

  border-radius: 0.625rem;
  background: #e5f1ff;

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
`;

export default BoothEventBanner;
