import React from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const ResultCardBack = ({ color, name, nickname, knowhow }) => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} recycle={false} />
      <WrapCard $color={color}>
        <Line>{name}</Line>
        <ProfileSection>
          <WrapImg $color={color}>
            <img src="/assets/event/profile.png" alt="프로필 사진" />
          </WrapImg>
          <h1 className="nickname">{nickname} 동백</h1>
          <p className="introduction">{knowhow}</p>
        </ProfileSection>
      </WrapCard>
    </>
  );
};

const WrapCard = styled.div<{ $color }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 17rem;
  height: 23rem;
  background-color: ${({ $color }) => $color};
  border-radius: 0.625rem;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;

  border: 4px solid #fff;
  border-radius: 0.625rem;
  width: 16rem;
  height: 22rem;

  color: #fff;
  font-family: NanumSquare_ac;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 15rem;
  background-color: white;

  border-radius: 0rem 0rem 0.625rem 0.625rem;

  padding: 5rem 1rem 1rem 1rem;

  h1 {
    color: #000;
    text-align: center;
    font-family: NanumSquare_ac;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  p {
    color: #000;
    text-align: center;
    font-family: NanumSquare_ac;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    padding-top: 1rem;
  }
`;

const WrapImg = styled.div<{ $color }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 50%;
  top: -3rem;
  transform: translateX(-50%);

  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: 3px solid ${({ $color }) => $color};
  background-color: white;
  img {
    width: 5rem;
  }
`;

export default ResultCardBack;
