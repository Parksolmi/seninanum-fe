import React from 'react';
import styled from 'styled-components';

const FieldCard = ({ color, field }) => {
  return (
    <WrapCard $color={color}>
      <Line>{field}</Line>
    </WrapCard>
  );
};

const WrapCard = styled.div<{ $color }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 13rem;
  height: 20rem;
  background-color: ${({ $color }) => $color};
  border-radius: 0.625rem;

  /* 흰색 테두리 추가 */
  /* border: 4px solid #fff; */
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 4px solid #fff;
  border-radius: 0.625rem;
  width: 12rem;
  height: 19rem;

  color: #fff;
  font-family: NanumSquare_ac;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default FieldCard;
