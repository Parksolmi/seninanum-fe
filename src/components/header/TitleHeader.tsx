import React from 'react';
import styled from 'styled-components';

interface PrevHeaderProps {
  title: string;
  isShowAlert?: boolean;
}

const TitleHeader = ({ title, isShowAlert }: PrevHeaderProps) => {
  return (
    <WrapHeader>
      <TitleText>{title}</TitleText>
    </WrapHeader>
  );
};

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 2.1rem 1.1rem 0.7rem 1.1rem;
  border-bottom: solid 1px #ebeceb;
`;

const TitleText = styled.div`
  display: flex;
  flex: 1;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 500;

  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.03rem;
`;

export default TitleHeader;
