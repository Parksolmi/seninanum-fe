import styled from 'styled-components';
import React from 'react';

// chilren: 버튼 텍스트
// type: 동백 / 나리 / 비활성화
interface ButtonProps {
  children: string;
  disabled: boolean;
  readonly type: string | null;
  onClick: () => void;
}

const Button = ({ children, disabled, type, onClick }: ButtonProps) => {
  return (
    <StyledButton disabled={disabled} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 3.7rem;
  color: ${({ type }) => (type === null ? '#5B5B5B' : '#ffffff')};
  background-color: ${({ type }) =>
    type !== null
      ? type === '동백'
        ? `var(--Primary-dong)`
        : `var(--Primary-nari)`
      : '#EBECEB'};
  text-align: center;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border: none;
  border-radius: 0.625rem;
  transition: background-color 0.5s ease;
  position: sticky;

  &:disabled {
    background-color: #d9d9d9;
    color: #333333;
  }
`;

export default Button;
