import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PrevHeaderProps {
  title?: string;
  navigateTo?: string;
  onModify?: () => void;
  onClick?: () => void;
  isLine?: boolean;
  isCommunity?: boolean;
  onDelete?: () => void;
}

const PrevHeader = ({
  title,
  navigateTo,
  onModify,
  onClick,
  isLine,
  isCommunity,
  onDelete,
}: PrevHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (navigateTo === '-1') {
      navigate(-1); // 브라우저 이전 페이지로 이동
    } else if (navigateTo) {
      navigate(navigateTo); // 그 외 다른 경로로 이동
    }
  };

  const handleToggleDelete = (e: React.MouseEvent) => {
    const deleteButton = (e.target as HTMLElement).nextElementSibling;
    if (deleteButton) {
      deleteButton.classList.toggle('active');
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
      {isCommunity && (
        <>
          <img
            className="hamburger"
            src="/assets/community/burger-button-big.svg"
            alt="햄버거버튼"
            onClick={handleToggleDelete}
          />
          <div className="del" onClick={onDelete}>
            삭제하기
          </div>
        </>
      )}
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
  padding: 0 1.1rem 1.3rem 1.1rem;

  .hamburger {
    display: block;
    margin-bottom: auto;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.1rem;
    margin-left: 0.3rem;
  }

  .del {
    display: none;
    z-index: 10;
    position: absolute;
    top: 2rem;
    right: 0;
    width: 8rem;
    height: 2.5rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    line-height: 2.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: '#000';
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 700;
  }

  .del.active {
    display: block;
  }
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
