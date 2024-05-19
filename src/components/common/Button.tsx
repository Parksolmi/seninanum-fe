import styled from 'styled-components';

// const backgroundColor = {
//   dong: '#FF314A',
//   nari: '#FFAA0E',
// };

interface ButtonProps {
  children: string;
  readonly type: 'dong' | 'nari';
}

const Button = ({ children, type }: ButtonProps) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 60px;
  color: #ffffff;
  background-color: ${({ type }) =>
    type === 'dong' ? 'var(--color-dong)' : 'var(--color-nari)'};
  text-align: center;
  border: none;
  border-radius: 10px;
`;

export default Button;
