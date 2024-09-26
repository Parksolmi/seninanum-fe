import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PrevHeaderProps {
  title: string;
  isShowAlert?: boolean;
}

const TitleHeader = ({ title, isShowAlert }: PrevHeaderProps) => {
  const navigate = useNavigate();

  return (
    <WrapHeader>
      <TitleText>{title}</TitleText>
      {isShowAlert && (
        <AlertButton onClick={() => navigate('/arert')}>
          {' '}
          {/*알림 페이지 경로 수정하기!!!*/}
          <img src={'/assets/common/alert.png'} alt="알림페이지" />
        </AlertButton>
      )}
    </WrapHeader>
  );
};

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 2.1rem 1.1rem 0.7rem 1.1rem;
  border-bottom: solid 1px #ebeceb;
`;

const AlertButton = styled.div`
  img {
    width: 1.3rem;
  }
`;

const TitleText = styled.div`
  display: flex;
  flex: 1;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.03rem;
`;

export default TitleHeader;
