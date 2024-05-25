import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  types: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}

const UserTypeButton: React.FC<ButtonProps> = ({
  types,
  isSelected,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    onClick(types);
  };
  return (
    <StyleBoxContainer
      setType={types}
      onClick={handleClick}
      isSelected={isSelected}
    >
      <Text1 setType={types}>{types}</Text1>
      <Text2>
        {types === '동백'
          ? '재능을 \n공유하고 싶어요.'
          : '재능을 \n공유받고 싶어요.'}
      </Text2>
      <Text3>
        {types === '동백'
          ? '은퇴하신 시니어분들 대상이에요.'
          : '누구나 재능을 공유받을 수 있어요.'}
      </Text3>
    </StyleBoxContainer>
  );
};

const StyleBoxContainer = styled.div<{ isSelected: boolean; setType: string }>`
  display: flex;
  margin-bottom: 0.94rem;
  padding-top: 1.88rem;
  padding-left: 0.81rem;
  flex-direction: column;
  width: 20.25rem;
  height: 10rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: ${({ isSelected, setType }) =>
    isSelected
      ? setType === '동백'
        ? '2px solid rgba(255, 49, 74, 0.7)'
        : '2px solid rgba(255, 170, 14, 0.70)'
      : 'var(--Base-White, #fff)'};
  background-color: ${({ isSelected, setType }) =>
    isSelected
      ? setType === '동백'
        ? 'var(--Secondary-dong-2, #ffedf0)'
        : 'var(--Secondary-nari-2, #FFF8E3)'
      : 'var(--Base-White, #fff)'};

  box-shadow: 0px 1px 7.4px 3px rgba(150, 150, 150, 0.25);
`;

const Text1 = styled.div<{ setType: string }>`
  display: flex;
  width: 7.3125rem;
  height: 1.1875rem;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.81rem;
  color: ${({ setType }) =>
    setType === '동백'
      ? 'var(--Primary-dong, #ff314a)'
      : 'var(--Primary-nari, #FFAA0E)'};
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: NanumSquareB;
`;

const Text2 = styled.div`
  display: flex;
  width: 9.75rem;
  height: 3.375rem;
  flex-direction: column;
  justify-content: center;
  white-space: pre-line;
  flex-shrink: 0;
  color: var(--Base-Black, #000);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Text3 = styled.div`
  display: flex;
  width: 16.4375rem;
  height: 1.75rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #5b5b5b;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default UserTypeButton;
