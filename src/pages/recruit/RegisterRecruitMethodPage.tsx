import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Dropdown from '../../components/common/DropDown';
import regionState from './../../constants/regionState';
import useRecruitState from '../../store/recruitState';

interface OutletContext {
  setStatus: (status: number) => void;
}

const RegisterRecruitMethodPage = () => {
  const navigate = useNavigate();
  const { setStatus } = useOutletContext<OutletContext>();
  const { recruitState, setRecruitState } = useRecruitState();

  const [selectedMethod, setSelectedMethod] = useState<string>(
    recruitState.method || ''
  );
  const [selectedRegion, setSelectedRegion] = useState<string>(
    recruitState.region || ''
  );

  const isDisabled =
    !selectedMethod || (!selectedRegion && selectedMethod !== '비대면');

  useEffect(() => {
    setRecruitState({ method: selectedMethod, region: selectedRegion });
  }, [setRecruitState, selectedMethod, selectedRegion]);

  console.log(recruitState);
  useEffect(() => {
    setStatus(2);
  }, [setStatus]);

  return (
    <WrapContent>
      <TitleText>{`어떤 방식으로 진행되나요?`}</TitleText>
      <MethodButtonContainer>
        {[
          { value: '대면', label: '대면 서비스' },
          { value: '비대면', label: '비대면 서비스' },
          { value: '모두', label: '모두 선택' },
        ].map((method) => (
          <MethodButton
            key={method.value}
            $isSelected={selectedMethod === method.value}
            onClick={() => setSelectedMethod(method.value)}
          >
            {method.label}
          </MethodButton>
        ))}
      </MethodButtonContainer>
      {selectedMethod !== '' && selectedMethod !== '비대면' && (
        <>
          <TitleText>희망 지역을 선택해주세요.</TitleText>
          <Dropdown
            userType="nari"
            placeholder="지역선택"
            list={regionState.list}
            selected={selectedRegion}
            onSelect={setSelectedRegion}
          />
        </>
      )}

      <WrapButton>
        <Button
          userType={null}
          disabled={false}
          children={'이전'}
          onClick={() =>
            recruitState.recruitId
              ? navigate(`/modify/recruit/${recruitState.recruitId}/field`)
              : navigate('/register/recruit/field')
          }
        ></Button>
        <Button
          userType={'nari'}
          disabled={isDisabled}
          children={'다음'}
          onClick={() =>
            recruitState.recruitId
              ? navigate(`/modify/recruit/${recruitState.recruitId}/content`)
              : navigate('/register/recruit/content')
          }
        ></Button>
      </WrapButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem 3rem 1.1rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const MethodButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  font-size: 1.25rem;
  font-weight: 600;

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

export default RegisterRecruitMethodPage;
