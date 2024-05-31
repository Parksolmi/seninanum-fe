import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../components/common/CheckBox';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const AgreePolicyPage: React.FC = () => {
  const [checkboxes, setCheckboxes] = useState({
    selectAll: false,
    option1: false,
    option2: false,
  });

  const handleSelectAllChange = (checked: boolean) => {
    setCheckboxes({
      selectAll: checked,
      option1: checked,
      option2: checked,
    });
  };

  const handleOptionChange = (
    option: 'option1' | 'option2',
    checked: boolean
  ) => {
    setCheckboxes((prev) => {
      const updatedCheckboxes = {
        ...prev,
        [option]: checked,
        selectAll:
          (checked && prev.option1 && prev.option2) ||
          (!checked && !prev.option1 && !prev.option2)
            ? checked
            : prev.selectAll,
      };
      updatedCheckboxes.selectAll =
        updatedCheckboxes.option1 && updatedCheckboxes.option2;
      return updatedCheckboxes;
    });
  };
  // 비활성화 조건
  const isDisabled =
    checkboxes.selectAll === false ||
    checkboxes.option1 === false ||
    checkboxes.option2 === false;

  const navigate = useNavigate();
  // 페이지 이동
  const onClickBtn = () => {
    window.location.href = '/signup/profile';
  };
  const onClickBackBtn = () => {
    navigate(-1);
  };
  return (
    <WrapContent>
      <Back onClick={onClickBackBtn}>
        <img src="/assets/signIn/back-icon.svg" alt="back" />
      </Back>

      <Text1>시니나눔이 처음이시네요!</Text1>
      <Text2>이용약관에 동의해주세요.</Text2>
      <CheckBox
        id="전체 선택"
        label="약관에 모두 동의"
        checked={checkboxes.selectAll}
        onChange={handleSelectAllChange}
      />
      <CheckBox
        id="1"
        label="(필수) 만 14세 이상입니다"
        checked={checkboxes.option1}
        onChange={(checked) => handleOptionChange('option1', checked)}
      />
      <CheckBox
        id="2"
        label="(필수) 이용약관"
        checked={checkboxes.option2}
        onChange={(checked) => handleOptionChange('option2', checked)}
      />
      <WrapButton>
        <Button disabled={isDisabled} type="나리" onClick={onClickBtn}>
          다음
        </Button>
      </WrapButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
`;
const Back = styled.div`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  margin-top: 1.81rem;
  img {
    width: 16px;
    height: 16px;
  }
`;

const Text1 = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.03rem;
`;
const Text2 = styled.div`
  margin-bottom: 4rem;
  color: var(--Base-Deep-Gray, #5b5b5b);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.025rem;
`;
const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;

export default AgreePolicyPage;
