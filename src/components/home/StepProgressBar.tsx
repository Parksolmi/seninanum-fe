import React from 'react';
import styled from 'styled-components';

const StepProgressBar = ({ activeStatus }) => {
  const totalSteps = 8;

  const steps = Array.from({ length: totalSteps + 1 }, (_, index) => (
    <Step key={index} $activeStatus={activeStatus}>
      {activeStatus === index && (
        <img src="/assets/home/home-progress-indicator.svg" alt="indicator" />
      )}
    </Step>
  ));

  return (
    <ProgressContainer>
      <ProgressTrack>
        <FilledBar $percent={(activeStatus * 100) / totalSteps} />
      </ProgressTrack>
      {steps}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #d9d9d9;
  border-radius: 10px;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const FilledBar = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background-color: #ff314a;
  border-radius: 10px 0 0 10px;
  transition: width 0.3s ease;
`;

const Step = styled.div<{ $activeStatus: number }>`
  position: absolute;
  left: ${({ $activeStatus }) =>
    `${$activeStatus === 0 ? 5 : 10 * $activeStatus}%`};
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: block;
  align-items: center;
  justify-content: center;
`;
export default StepProgressBar;
