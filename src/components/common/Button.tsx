import styled from 'styled-components';

interface ButtonProps {
  children: string;
  readonly type: 'dong' | 'nari';
}

const Button = ({ children, type }: ButtonProps) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 3.7rem;
  color: #ffffff;
  background-color: ${({ type }) =>
    type === 'dong' ? 'var(--color-dong)' : 'var(--color-nari)'};
  text-align: center;
  border: none;
  border-radius: 0.8rem;
`;

export default Button;
