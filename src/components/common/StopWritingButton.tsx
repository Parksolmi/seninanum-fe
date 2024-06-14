import styled from 'styled-components';
import React from 'react';

const StopWritingButton = () => {
  return (
    <ButtonBox>
      <ButtonText>나가기</ButtonText>
      <ButtonIcon src="/assets/home/recruit-exit.svg" />
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  width: 100%;
  height: 2.2rem;
  border-radius: 12.5rem;
  border: 1px solid #7f7f7f;
  background: #fff;
  display: flex;
  flex-direction: row;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled.img`
  width: 1rem;
  height: 0.7rem;
  margin-left: 0.3rem;
`;

const ButtonText = styled.div`
  color: #868686;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 400;
`;
export default StopWritingButton;
