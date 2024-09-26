import React from 'react';
import styled from 'styled-components';

interface CareerFileBoxProps {
  uploadedFileName: string | null;
  activeStatus: string;
  onDelete: () => void;
}
const CareerFileBox: React.FC<CareerFileBoxProps> = ({
  uploadedFileName,
  activeStatus,
  onDelete,
}) => {
  const statusArr = ['제출', '검토', '승인'];
  const statusMessage = {
    제출: `서류가 ${statusArr[0]}되었어요!`,
    검토: `관리자가 서류를 ${statusArr[1]}하고 있어요!`,
    승인: `서류가 최종${statusArr[2]}되었어요!`,
  };
  return (
    <BoxContainer>
      <DeleteButton src="/assets/common/page-close.svg" onClick={onDelete} />
      <ImgArea src="/assets/home/file-icon.svg" />
      <FileNameText>{uploadedFileName}</FileNameText>
      <TextStyle $isActive={false}>{statusMessage[activeStatus]}</TextStyle>
      <StatusArea>
        <BackStatusContainer>
          <Indicator
            $activeStatus={
              activeStatus === '제출'
                ? 0
                : activeStatus === '검토'
                ? 1
                : activeStatus === '승인'
                ? 2
                : 0
            }
          />
        </BackStatusContainer>
        <TextArea>
          {statusArr.map((status, index) => (
            <TextStyle $isActive={status === activeStatus} key={index}>
              {status}
            </TextStyle>
          ))}
        </TextArea>
      </StatusArea>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 1rem;
  border-radius: 5px;
  background: #f7f8f7;
  position: relative;
`;

const DeleteButton = styled.img`
  position: absolute;
  right: 0;
  padding: 1rem;
`;

const ImgArea = styled.img`
  display: block;
  margin: auto;
  padding-top: 1.3rem;
`;

const FileNameText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`;

const StatusArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`;

const BackStatusContainer = styled.div`
  width: 100%;
  align-items: center;
  height: 0.6rem;
  border-radius: 3rem;
  background: #d9d9d9;
  display: flex;
  justify-content: flex-start;
`;

const Indicator = styled.span<{
  $activeStatus: number;
}>`
  width: ${({ $activeStatus }) =>
    $activeStatus === 0 ? 5 : $activeStatus * 50}%;
  height: 0.6rem;
  border-radius: 3rem;
  background: #ff314a;
`;

const TextArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 1rem;
`;

const TextStyle = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive }) => ($isActive ? '#ff314a' : '#5b5b5b')};
  text-align: center;
  font-family: NanumSquare;
  font-size: 0.875rem;
  font-weight: 400;
`;

export default CareerFileBox;
