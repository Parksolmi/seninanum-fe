import styled from 'styled-components';

interface InputProps {
  inputPlaceholder: string;
}

const Input = ({ inputPlaceholder }: InputProps) => {
  return <InputBox type="text" placeholder={inputPlaceholder}></InputBox>;
};

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  &::placeholder {
    color: #5b5b5b;
  }
`;

export default Input;
