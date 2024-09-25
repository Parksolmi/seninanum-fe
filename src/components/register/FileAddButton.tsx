// import React, { useState } from 'react';
import styled from 'styled-components';

interface FileProps {
  onFileUpload: (file: File) => void;
  addText: string;
}
const FileAddButton = ({ onFileUpload, addText }: FileProps) => {
  // const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // setFile(e.target.files[0]);
      onFileUpload(e.target.files[0]);
    }
  };
  return (
    <label>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <FileAddButtonWrapper>
        <WrapButton>
          <BtnImage src="/assets/home/add-career-dong.svg" alt="파일추가버튼" />
          <AddArea>
            <AddIcon src="/assets/common/add.svg" alt="추가아이콘"></AddIcon>
            <AddText>{addText}</AddText>
          </AddArea>
        </WrapButton>
      </FileAddButtonWrapper>
    </label>
  );
};

const FileAddButtonWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const WrapButton = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0.75rem;
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
  color: var(--Base-Gray2, #5b5b5b);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0%; /* 0rem */
`;

export default FileAddButton;
