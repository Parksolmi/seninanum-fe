import styled from 'styled-components';
import React from 'react';

//name 적용 필요 : RegisterProfileCareerAddPage
interface InputProps {
  name?: string;
  inputPlaceholder: string;
  onChange: (e: any) => void;
  maxLength: number;
}

const Input = ({ name, inputPlaceholder, onChange, maxLength }: InputProps) => {
  return (
    <InputBox
      name={name}
      type="text"
      placeholder={inputPlaceholder}
      onChange={onChange}
      maxLength={maxLength}
    ></InputBox>
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
  font-size: 1.3rem;
  font-weight: 400;
  text &::placeholder {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

export default Input;
