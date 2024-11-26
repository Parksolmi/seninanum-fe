import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../../components/header/ExitHeader';

const DrawPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PrevButton onClick={() => navigate(-1)}>
        <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
      </PrevButton>
      <WrapExitHeader>
        <ExitHeader
          navigateTo="/community"
          userType={'dong'}
          backgroundColor="#f0e0c9"
        />
      </WrapExitHeader>
      <WrapContent>
        <WrapImage>
          <Shadow />
          <MachineImg src="/assets/event/drawMachine.png" alt="뽑기 기계" />
        </WrapImage>
        <StyledButton children="노하우 뽑기" />
      </WrapContent>
    </>
  );
};

const WrapExitHeader = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
`;
const PrevButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 99;

  img {
    width: 0.8rem;
  }
`;

const WrapContent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0e0c9;
  padding: 1.3rem 1.1rem;

  display: flex;
  flex-direction: column;
`;

const WrapImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Shadow = styled.div`
  width: 100%;
  height: 8.0625rem;
  border-radius: 50%;
  background-color: #ead2b4;
  position: absolute;
  bottom: -1rem;
  z-index: 0;
`;

const MachineImg = styled.img`
  width: 100%;

  position: relative;
  z-index: 1;
  margin-top: 4rem;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 13.4375rem;
  height: 4.25rem;
  flex-shrink: 0;

  color: #fff;
  font-family: 'NanumSquare';
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border-radius: 0.875rem;

  margin: 2rem auto 0 auto;

  background-color: var(--Primary-dong);
`;

export default DrawPage;
