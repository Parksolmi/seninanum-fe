import styled from 'styled-components';
import React from 'react';

// chilren: 버튼 텍스트
// userType: dong / nari / 비활성화
interface ButtonProps {
  children: string;
  disabled: boolean;
  readonly userType: string | null;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset'; // 추가된 타입 속성
  isBottom?: boolean;
}

const Button = ({
  children,
  disabled,
  userType,
  onClick,
  type = 'button',
  isBottom = true,
}: ButtonProps) => {
  return (
    <WrapButtonContainer $isBottom={isBottom}>
      <WrapButton>
        <StyledButton
          disabled={disabled}
          $type={userType}
          onClick={onClick}
          type={type}
        >
          {children}
        </StyledButton>
      </WrapButton>
    </WrapButtonContainer>
  );
};

interface WrapButtonContainerProps {
  $isBottom: boolean;
}

const WrapButtonContainer = styled.div<WrapButtonContainerProps>`
  background-color: #fff;

  ${({ $isBottom }) =>
    $isBottom
      ? `
          padding: 1.1rem 1.1rem 2.75rem 1.1rem;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
        `
      : `
          display: flex;
          width: 100%;
          position: relative;
        `}
`;

const WrapButton = styled.div`
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

export default Button;
