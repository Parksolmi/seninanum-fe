import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  types: string;
  isSelected: boolean;
  onClick: (types: string) => void;
}

const UserTypeButton: React.FC<ButtonProps> = ({
  types,
  isSelected,
  onClick,
}: ButtonProps) => {
  return (
    <StyleBoxContainer
      setType={types}
      onClick={() => onClick(types)}
      isSelected={isSelected}
    >
      <UserType setType={types}>{types}</UserType>
      <Content>
        {types === '동백'
          ? '재능을 \n공유하고 싶어요.'
          : '재능을 \n공유받고 싶어요.'}
      </Content>
      <DetailContent>
        {types === '동백'
          ? '은퇴하신 시니어분들 대상이에요.'
          : '누구나 재능을 공유받을 수 있어요.'}
      </DetailContent>
    </StyleBoxContainer>
  );
};

const StyleBoxContainer = styled.div<{ isSelected: boolean; setType: string }>`
  display: flex;
  margin-bottom: 0.94rem;
  padding-top: 1.88rem;
  padding-left: 0.81rem;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: ${({ isSelected, setType }) =>
    isSelected
      ? setType === '동백'
        ? '2px solid var(--Primary-dong)'
        : '2px solid var(--Primary-nari)'
      : `var(--Base-White)`};
  background-color: ${({ isSelected, setType }) =>
    isSelected
      ? setType === '동백'
        ? `var(--Secondary-dong-2)`
        : `var(--Secondary-nari-2)`
      : `var(--Base-White)`};

  box-shadow: 0px 1px 7.4px 3px rgba(150, 150, 150, 0.25);
  transition: background-color 0.5s ease;
`;

const UserType = styled.div<{ setType: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.81rem;
  color: ${({ setType }) =>
    setType === '동백' ? `var(--Primary-dong)` : `var(--Primary-nari)`};
  font-size: 1.5rem;
  font-family: Nanum_Square;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: pre-line;
  flex-shrink: 0;
  color: var(--Base-Black);
  font-size: 1.25rem;
  font-family: Nanum_Square;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #5b5b5b;
  font-family: Nanum_Square;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default UserTypeButton;
