import React from 'react';
import styled from 'styled-components';

const PayResponse = ({ pay }) => {
  return (
    <WrapContent>
      <WrapImage>
        <img
          className="logo"
          src="/assets/chat/senipay-logo.png"
          alt="시니페이"
        />
        <img
          className="character"
          src="/assets/character/nari-pay.png"
          alt="캐릭터"
        />
      </WrapImage>

      <WrapBottom>
        <WrapText className="sendByMe">
          <h1>송금완료</h1>
          <p>{pay} 원</p>
        </WrapText>
      </WrapBottom>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  width: 14.125rem;
  flex-shrink: 0;

  background-color: #fff;
  stroke-width: 1px;
  border: 1px solid var(--Base-Gray2, #ebeceb);
  border-radius: 1.25rem;
`;

const WrapImage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100px;
  background-color: #dcf5f6;
  border-radius: 1.25rem 1.25rem 0 0;

  padding: 0 1rem;

  .logo {
    object-fit: contain;
    width: 7rem;
  }

  .character {
    object-fit: contain;
    width: 4rem;
  }
`;

const WrapBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
`;

const WrapText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: left;

  h1 {
    color: var(--Nari-1, #ffd111);
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }

  p {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export default PayResponse;
