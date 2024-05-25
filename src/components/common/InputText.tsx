import styled from 'styled-components';

interface InputProps {
  label: string;
  placeholder: string;
}

const InputText = ({ label, placeholder }: InputProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputBox type="text" placeholder={placeholder}></InputBox>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  font-family: NanumSquareB;
`;
const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid var(--Base-Deep-Gray);
  border-radius: 10px;
  font-weight: 700;
  font-family: NanumSquareB;
  font-size: 1.2rem;
  padding-left: 0.5rem;

  &::placeholder {
    font-weight: 300;
    line-height: 1rem;
    color: var(--Base-Deep-Gray);
  }

  &:focus {
    outline: none;
    border: 1.5px solid var(--Primary-dong);
    border-radius: 0.8rem;
  }
`;

export default InputText;
