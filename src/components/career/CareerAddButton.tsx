import React from 'react';
import styled from 'styled-components';

interface FileProps {
  addText: string;
  onClick: () => void;
}
const CareerAddButton = ({ addText, onClick }: FileProps) => {
  return (
    <WrapButton onClick={onClick}>
      <BtnImage src="/assets/home/add-career-dong.svg" alt="파일추가버튼" />
      <AddArea>
        <AddIcon src="/assets/common/add.svg" alt="추가아이콘" />
        <AddText>{addText}</AddText>
      </AddArea>
    </WrapButton>
  );
};

const WrapButton = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const BtnImage = styled.img`
  /* object-fit: cover; */
  width: 100%;
  height: 100%;
`;
const AddArea = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.5rem;
  bottom: 0.8rem;
  left: 7rem;
  right: 7rem;
`;
const AddIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;
const AddText = styled.div`
  color: #5b5b5b;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0%; /* 0rem */
  padding-left: 0.5rem;
`;
export default CareerAddButton;
