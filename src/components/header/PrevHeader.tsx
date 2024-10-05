import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PrevHeaderProps {
  title?: string;
  navigateTo: string;
}

const PrevHeader = ({ title, navigateTo }: PrevHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (navigateTo === '-1') {
      navigate(-1); // 브라우저 이전 페이지로 이동
    } else {
      navigate(navigateTo); // 그 외 다른 경로로 이동
    }
  };

  return (
    <WrapHeader>
      {navigateTo && (
        <BackButton onClick={handleNavigation}>
          <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
        </BackButton>
      )}
      <TitleText>{title}</TitleText>
    </WrapHeader>
  );
};

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.8rem;
  border-bottom: solid 1px var(--Base-Gray2, #ebeceb);
  padding: 0 1.1rem 0.5rem 1.1rem;
`;

const BackButton = styled.div`
  img {
    width: 0.8rem;
  }
`;

const TitleText = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.075rem;
  font-style: normal;
  line-height: normal;
`;

export default PrevHeader;
