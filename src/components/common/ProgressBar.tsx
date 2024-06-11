import React from 'react';
import styled from 'styled-components';

interface ProgressType {
  status: number;
  type: string;
}

const ProgressBar = ({ status, type }: ProgressType) => {
  return (
    <BarStyle>
      <img
        src={`/assets/home/progress-step${status}-${type}.svg`}
        alt="진행단계"
      />
    </BarStyle>
  );
};

const BarStyle = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;

export default ProgressBar;
