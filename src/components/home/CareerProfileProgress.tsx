import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StepProgressBar from './StepProgressBar';
import { instance } from '../../api/instance';

interface progressStepProps {
  progressStep: number;
}

const CareerProfileProgress: React.FC<progressStepProps> = ({
  progressStep,
}) => {
  const navigate = useNavigate();
  const fetchProfileId = async () => {
    try {
      const res = await instance.post('/career');
      navigate(`/register/profile/career/${res.data.profileId}`);
    } catch (error) {
      console.error('사용자 정보 조회에 실패하였습니다.');
    }
  };

  return (
    <InputContainer>
      <Progress>{`현재 ${progressStep}/8 완성`}</Progress>
      <Title>
        <p>나의 경력프로필 채우기</p>
        <img
          src={'/assets/common/right-arrow.svg'}
          alt="naviate"
          onClick={fetchProfileId}
        />
      </Title>
      <StepProgressBar activeStatus={progressStep} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 148px;
  flex-shrink: 0;
  border-radius: 11px 71px 11px 11px;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  padding: 1.2rem 1rem;
`;

const Progress = styled.div`
  color: var(--Primary-dong);
  font-size: 1rem;
  font-family: 'NanumSquareR';
  font-weight: 800;
  letter-spacing: 0.32px;
`;

const Title = styled.h3`
  display: flex;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 800;
  padding: 0.7rem 0;

  img {
    padding-left: 0.5rem;
  }
`;

export default CareerProfileProgress;
