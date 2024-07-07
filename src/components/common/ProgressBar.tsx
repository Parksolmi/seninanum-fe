import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ProgressType {
  status: number;
  type: string;
}

const ProgressBar = ({ status, type }: ProgressType) => {
  const [activeStatus, setActiveStatus] = useState(status);
  const progressArr = [1, 2, 3];

  const getIndicatiorColor = (type: string) => {
    switch (type) {
      case 'dong':
        return 'var(--Primary-dong)';
      case 'nari':
        return 'var(--Primary-nari)';
      default:
        return '#EBECEB';
    }
  };

  useEffect(() => {
    setActiveStatus(status);
  }, [status]);

  return (
    <BarStyle key={status}>
      <Container>
        <BackgroundImage
          src="/assets/common/progressbar-background.svg"
          alt="backgroundImg"
        />
        <Steps>
          {progressArr.map((index) => (
            <Circle
              key={index}
              className={
                index < activeStatus
                  ? 'active'
                  : index === activeStatus
                  ? 'current'
                  : 'inactive'
              }
            >
              <Checkmark />
            </Circle>
          ))}
          <ProgressBarContainer>
            <Indicator
              width={(activeStatus - 1) * 50}
              color={getIndicatiorColor(type)}
            ></Indicator>
          </ProgressBarContainer>
        </Steps>
      </Container>
    </BarStyle>
  );
};

const BarStyle = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: -5;
`;

const Steps = styled.div`
  display: flex;
  width: 98%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Circle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7%;
  height: 75%;
  border-radius: 50%;
  background-color: #fff;
  border: 5px solid var(--Primary-dong);
  transition: all 300ms ease;
  z-index: 10;
  position: relative;

  &.active {
    border-color: var(--Primary-dong);
    background-color: var(--Primary-dong);
  }

  &.inactive {
    visibility: hidden;
  }

  &.current {
    background-color: #fff;
    border: 5px solid var(--Primary-dong);
  }
`;
const draw = keyframes`
  0% {
    stroke-dasharray: 0, 14;
  }
  100% {
    stroke-dasharray: 14, 0;
  }
`;

const Svg = styled.svg`
  width: 50px;
  height: 50px;
  path {
    fill: white;
    stroke: white;
    stroke-width: 0.2;
    stroke-dasharray: 14, 0;
    animation: ${draw} 0.3s ease forwards;
  }
`;

const Checkmark = () => (
  <Svg viewBox="0 0 14 11">
    <path d="M2.03886 5.23073L1.96898 5.16198L1.89885 5.23048L0.930122 6.17679L0.857152 6.24807L0.92987 6.31961L4.7434 10.0713L4.81353 10.1403L4.88366 10.0713L13.0701 2.0176L13.1426 1.94631L13.0701 1.87502L12.1082 0.928714L12.0381 0.859753L11.968 0.92868L4.81356 7.96042L2.03886 5.23073Z" />
  </Svg>
);
const ProgressBarContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  justify-content: center;
  transform: translate(-50%, -50%);
  width: 98%;
  background: transparent;
`;

const Indicator = styled.span<{
  width: number;
  color: string;
}>`
  position: absolute;
  /* left: 0; */
  height: 7px;
  width: ${({ width }) => width}%;
  background: ${({ color }) => color};
  transition: width 500ms ease;
  z-index: -1;
`;

export default ProgressBar;
