import styled from 'styled-components';
import React from 'react';

interface TextAreaProps {
  inputPlaceholder: string;
}

const TextArea = ({ inputPlaceholder }: TextAreaProps) => {
  return <TextAreaStyle placeholder={inputPlaceholder}></TextAreaStyle>;
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
    color: #5b5b5b;
  }
`;

export default TextArea;
