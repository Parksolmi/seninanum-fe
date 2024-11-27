import React from 'react';
import styled from 'styled-components';

const PayRequest = ({ isSentByMe, pay, onClick }) => {
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
          src="/assets/character/dong-pay.png"
          alt="캐릭터"
        />
      </WrapImage>

      <WrapBottom>
        <WrapText className="sendByOther">
          <h1>송금요청</h1>
          <p>{pay} 원</p>
        </WrapText>
        {!isSentByMe && <Button onClick={onClick}>보내기</Button>}
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
  background-color: #eef6dc;
  border-radius: 1.25rem 1.25rem 0 0;

  padding-left: 1rem;

  .logo {
    object-fit: contain;
    width: 7rem;
  }

  .character {
    object-fit: contain;
    width: 5rem;
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

  &.sendByMe {
    flex-direction: row;
    justify-content: space-between;
  }

  &.sendByOther {
    flex-direction: column;
    text-align: left;
  }

  h1 {
    color: var(--Dong-main, #ff314a);
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

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6rem;
  height: 2.57719rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 2px solid var(--Dong-main, #ff314a);
  background: #fff;

  color: var(--Dong-main, #ff314a);
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export default PayRequest;
