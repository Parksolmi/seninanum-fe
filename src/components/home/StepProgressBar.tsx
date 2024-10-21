import React from 'react';
import styled from 'styled-components';

const StepProgressBar = ({ activeStatus }) => {
  const totalSteps = 8;

  const steps = Array.from({ length: totalSteps + 1 }, (_, index) => (
    <Step key={index} $activeStatus={activeStatus}>
      {activeStatus === index && (
        <img src="/assets/home/home-progress-indicator.png" alt="indicator" />
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
  position: relative;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 1.8rem;
  background-color: #d9d9d9;
  border-radius: 1rem;
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
  z-index: 100;
  top: -0.3rem;
  left: ${({ $activeStatus }) =>
    `${12.5 * $activeStatus}%`}; /* 12.5%씩 증가하도록 수정 */
  width: 52px;
  height: 44px;
  display: flex;
  align-items: center;

  img {
    width: 4.5rem;
    margin-bottom: 0.5rem;
    margin-left: ${({ $activeStatus }) =>
      $activeStatus === 0 ? '-15px' : '-60px'};
  }
`;
export default StepProgressBar;
