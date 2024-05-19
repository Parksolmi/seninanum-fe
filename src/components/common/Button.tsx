import styled from 'styled-components';
const backgroundColor = {
  dong: '#FF314A',
  nari: '#FFAA0E',
};
interface ButtonProps {
  // 동적으로 변경되는 버튼 텍스트
  children: string;
  // 동적으로 변경되는 버튼 색
  readonly varient: 'dong' | 'nari';
}
const StyledButton = styled.button<ButtonProps>`
  width: 328px;
  height: 60px;
  color: #ffffff;
  background-color: ${(props) => backgroundColor[props.varient]};
  text-align: center;
  border: none;
  border-radius: 10px;
`;
const Button = ({ children, varient }: ButtonProps) => {
  return <StyledButton varient={varient}>{children}</StyledButton>;
};
export default Button;
