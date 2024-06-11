import React, { useState } from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import RegionDropDown from '../../components/common/RegionDropDown';
import { useNavigate } from 'react-router-dom';

const RegisterRecruitMethodPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleButtonClick = (method: string) => {
    setSelectedMethod(method);
  };

  const navigateToField = () => {
    navigate('/register/recruit/field');
  };
  const navigateToContent = () => {
    navigate('/register/recruit/content');
  };

  return (
    <WrapContent>
      <ButtonWrap>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={1} type={'nari'} />
      <CategoryText>{`어떤 방식으로 진행되나요?`}</CategoryText>
      <MethodButtonContainer>
        {['대면 서비스', '비대면 서비스', '모두 선택'].map((method) => (
          <MethodButton
            key={method}
            $isSelected={selectedMethod === method}
            onClick={() => handleButtonClick(method)}
          >
            {method}
          </MethodButton>
        ))}
      </MethodButtonContainer>
      {selectedMethod !== '비대면 서비스' && (
        <>
          <SelectRegion>희망 지역을 선택해주세요.</SelectRegion>
          <RegionDropDown></RegionDropDown>
        </>
      )}

      <WrapButton>
        <Button
          type={null}
          disabled={false}
          children={'이전'}
          onClick={navigateToField}
        ></Button>
        <Button
          type={'nari'}
          disabled={false}
          children={'다음'}
          onClick={navigateToContent}
        ></Button>
      </WrapButton>
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
const ButtonWrap = styled.div`
  display: flex;
  float: right;
  width: 5.7rem;
  height: 2.2rem;
  margin-bottom: 1.63rem;
`;
const CategoryText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 6rem;
  margin-bottom: 1.56rem;
`;

const MethodButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;
`;

interface MethodButtonProps {
  $isSelected: boolean;
}

const MethodButton = styled.div<MethodButtonProps>`
  width: 100%;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: ${({ $isSelected }) =>
    $isSelected
      ? '2px solid var(--Primary-nari, #FFAA0E)'
      : '1px solid var(--Base-Gray, #8e8e8e)'};

  background: #fff;
  color: ${({ $isSelected }) =>
    $isSelected
      ? 'var(--Primary-nari-text, var(--Primary-nari-text, #F48400))'
      : 'var(--Base-Black, #000)'};
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;

const WrapButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
  gap: 1rem;
`;

const SelectRegion = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.03rem;
`;

export default RegisterRecruitMethodPage;
