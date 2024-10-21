import styled from 'styled-components';
import React from 'react';

//name 적용 필요 : RegisterProfileCareerAddPage
interface TextAreaProps {
  name?: string;
  inputPlaceholder: string;
  onChange: (e: any) => void;
  value?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  inputPlaceholder,
  onChange,
  value,
}) => {
  return (
    <TextAreaStyle
      name={name}
      placeholder={inputPlaceholder}
      onChange={onChange}
      value={value}
    />
  );
};

const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 20rem;
  display: flex;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  padding: 1.5rem 0.8rem;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 400;
  &::placeholder {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
  }
`;

export default TextArea;
