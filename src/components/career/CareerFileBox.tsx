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
  const statusArr = [
    { state: 'DEFAULT', text: '제출' },
    { state: 'PENDING', text: '검토' },
    { state: 'SUCCESS', text: '승인' },
  ];
  const statusMessage = {
    // 제출: `서류가 ${statusArr[0]}되었어요!`,
    PENDING: (
      <p>
        관리자가 서류를 <em>{statusArr[1].text}</em>하고 있어요!
      </p>
    ),
    SUCCESS: (
      <p>
        서류가 최종<em>{statusArr[2].text}</em>되었어요!
      </p>
    ),
  };

  return (
    <BoxContainer>
      <DeleteButton src="/assets/common/page-close.svg" onClick={onDelete} />
      <ImgArea src="/assets/home/file-icon.svg" />
      <FileNameText>{uploadedFileName}</FileNameText>
      <TextStyle $isActive={false}>{statusMessage[activeStatus]}</TextStyle>
      <StatusDiv>
        <BackStatusContainer>
          <Indicator
            $activeStatus={
              activeStatus === 'DEFAULT'
                ? 0
                : activeStatus === 'PENDING'
                ? 1
                : activeStatus === 'SUCCESS'
                ? 2
                : 0
            }
          />
        </BackStatusContainer>
        <WrapProgress>
          {statusArr.map((status, index) => (
            <TextStyle $isActive={status.state === activeStatus} key={index}>
              {status.text}
            </TextStyle>
          ))}
        </WrapProgress>
      </StatusDiv>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  width: 100%;
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

const StatusDiv = styled.div`
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

const WrapProgress = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.5rem 0;
`;

const TextStyle = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive }) => ($isActive ? '#ff314a' : '#5b5b5b')};
  text-align: center;
  font-family: NanumSquare;
  font-size: 0.875rem;
  font-weight: 400;

  p {
    color: var(--Base-Deep-Gray, #5b5b5b);
    font-family: NanumSquare;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0%;
    text-align: left;
    padding: 1.8rem 0 0 1rem;
  }
  em {
    color: #ff314a;
  }
`;

export default CareerFileBox;
