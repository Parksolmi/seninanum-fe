import styled from 'styled-components';
import React from 'react';

interface TextAreaProps {
  inputPlaceholder: string;
  onChange: (e: any) => void;
}

const TextArea = ({ inputPlaceholder, onChange }: TextAreaProps) => {
  return (
    <TextAreaStyle
      placeholder={inputPlaceholder}
      onChange={onChange}
    ></TextAreaStyle>
  );
};

const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 18.1875rem;
  display: flex;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  padding-left: 0.8rem;
  padding-top: 0.75rem;
  text &::placeholder {
    color: var(--Base-Gray2, #5b5b5b);
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export default TextArea;
