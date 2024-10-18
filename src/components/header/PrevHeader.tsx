import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PrevHeaderProps {
  title?: string;
  navigateTo?: string;
  onModify?: () => void;
  onClick?: () => void;
  isLine?: boolean;
}

const PrevHeader = ({
  title,
  navigateTo,
  onModify,
  onClick,
  isLine,
}: PrevHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (navigateTo === '-1') {
      navigate(-1); // 브라우저 이전 페이지로 이동
    } else if (navigateTo) {
      navigate(navigateTo); // 그 외 다른 경로로 이동
    }
  };

  return (
    <WrapHeader $isLine={isLine}>
      {navigateTo && (
        <BackButton onClick={handleNavigation}>
          <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
        </BackButton>
      )}
      <TitleWrapper>
        <TitleText onClick={onClick}>{title}</TitleText>
      </TitleWrapper>
      {onModify && <ModifyText onClick={onModify}>수정</ModifyText>}
    </WrapHeader>
  );
};

interface WrapHeaderProp {
  $isLine?: boolean;
}
const WrapHeader = styled.div<WrapHeaderProp>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.8rem;
  ${(props) =>
    props.$isLine ? 'border-bottom: solid 1px var(--Base-Gray2, #ebeceb);' : ''}
  padding: 0 1.1rem 0.5rem 1.1rem;
`;

const BackButton = styled.div`
  z-index: 9;
  img {
    width: 0.8rem;
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  flex: 1;
  display: flex;
  justify-content: center;
`;

const TitleText = styled.span`
  display: flex;
  text-align: center;
  justify-content: center;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.075rem;
`;

const ModifyText = styled.span`
  color: #f48400;
  font-family: NanumSquare;
  font-size: 1.25rem;
`;

export default PrevHeader;
