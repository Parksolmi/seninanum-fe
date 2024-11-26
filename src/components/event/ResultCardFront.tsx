import React from 'react';
import styled from 'styled-components';

const ResultCardFront = ({ color, field }) => {
  return (
    <>
      <WrapCard $color={color}>
        <Line>{field}</Line>
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

  position: relative;
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export default ResultCardFront;
