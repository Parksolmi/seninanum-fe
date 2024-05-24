import styled from 'styled-components';
import { types } from 'util';

// chilren: 버튼 텍스트
// type: 동백 / 나리 / 비활성화
interface ButtonProps {
  children: string;
  readonly type: string | null;
}

const Button = ({ children, type }: ButtonProps) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 3.7rem;
  color: ${({ type }) => (type === null ? '#5B5B5B' : '#ffffff')};
  background-color: ${({ type }) =>
    type === null
      ? 'var(--Base-Gray2, #EBECEB)'
      : type === '동백'
      ? 'var(--color-dong)'
      : 'var(--color-nari)'};
  text-align: center;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border: none;
  border-radius: 0.625rem;
`;

export default Button;
