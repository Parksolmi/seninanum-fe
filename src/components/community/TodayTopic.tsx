import React from 'react';
import styled from 'styled-components';

interface TodayTopic {
  userType: string;
}

const TodayTopic = ({ userType }: TodayTopic) => {
  return (
    <WrapContent $userType={userType}>
      <h1>Q</h1>
      <p>
        20대 때 꼭 이뤄야하는 것은
        <br /> 뭐라고 생각하시나요?
      </p>
    </WrapContent>
  );
};

const WrapContent = styled.div<{ $userType: string }>`
  width: 100%;
  height: 10rem;
  background-color: ${({ $userType }) =>
    $userType === 'dong' ? 'var(--Primary-dong)' : 'var(--Nari-1)'};
  color: ${({ $userType }) =>
    $userType === 'dong' ? 'white' : 'var(--Nari-Nari-Text)'};
  border-radius: 0.9375rem;

  padding: 1.3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  h1 {
    color: #fff;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.6875rem; /* 122.727% */
    letter-spacing: 0.0275rem;
  }

  p {
    color: #fff;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.6875rem; /* 122.727% */
    letter-spacing: 0.0275rem;
  }
`;

export default TodayTopic;
