import styled from 'styled-components';
import React from 'react';

interface PrevNextButtonProps {
  leftText: string;
  rightText: string;
  leftDisabled: boolean;
  rightDisabled: boolean;
  readonly leftUserType: string | null;
  readonly rightUserType: string | null;
  handlePrev: () => void;
  handleNext: () => void;
  type?: 'button' | 'submit' | 'reset'; // 추가된 타입 속성
}

const PrevNextButton = ({
  leftText,
  rightText,
  leftDisabled,
  rightDisabled,
  leftUserType,
  rightUserType,
  handlePrev,
  handleNext,
  type = 'button',
}: PrevNextButtonProps) => {
  return (
    <WrapButtonContainer>
      <WrapButton>
        <StyledButton
          disabled={leftDisabled}
          $type={leftUserType}
          onClick={handlePrev}
          type={type}
        >
          {leftText}
        </StyledButton>
        <StyledButton
          disabled={rightDisabled}
          $type={rightUserType}
          onClick={handleNext}
          type={type}
        >
          {rightText}
        </StyledButton>
      </WrapButton>
    </WrapButtonContainer>
  );
};

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 2.75rem 1.1rem;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  width: 100%;
  height: 3.7rem;
  align-items: center;
`;

interface styleButton {
  $type: string | null;
}
const StyledButton = styled.button<styleButton>`
  width: 100%;
  height: 3.7rem;
  color: ${({ $type }) =>
    $type !== null
      ? $type === 'dong'
        ? '#ffffff'
        : 'var(--Nari-Nari-Text)'
      : 'var(--Base-Deep-Gray)'};
  background-color: ${({ $type }) =>
    $type !== null
      ? $type === 'dong'
        ? `var(--Primary-dong)`
        : `var(--Nari-1)`
      : '#EBECEB'};
  text-align: center;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  border-radius: 0.625rem;
  font-family: NanumSquare;

  transition: background-color 0.5s ease;
  &:disabled {
    background-color: #d9d9d9;
    color: #333333;
  }
`;

export default PrevNextButton;
