import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputText = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}: InputProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputBox
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      ></InputBox>
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
  font-family: Nanum_Square;
`;
const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid var(--Base-Deep-Gray);
  border-radius: 10px;
  font-weight: 700;
  font-family: Nanum_Square;
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
