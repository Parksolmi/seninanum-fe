import styled from 'styled-components';
import React from 'react';

//name 적용 필요 : RegisterProfileCareerAddPage
interface InputProps {
  name?: string;
  value?: string;
  inputPlaceholder: string;
  onChange: (e: any) => void;
  maxLength: number;
}

const Input = ({
  name,
  inputPlaceholder,
  onChange,
  maxLength,
  value,
}: InputProps) => {
  return (
    <InputBox
      name={name}
      type="text"
      placeholder={inputPlaceholder}
      onChange={onChange}
      maxLength={maxLength}
      value={value}
    />
  );
};

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  padding-left: 0.8rem;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 400;
  text &::placeholder {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border: 1.5px solid #000;
  }
`;

export default Input;
