import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../components/common/CheckBox';

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
  return (
    <>
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
    </>
  );
};

const Text1 = styled.div`
  margin-top: 2.25rem;
  margin-bottom: 0.75rem;
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.03rem;
`;
const Text2 = styled.div`
  color: var(--Base-Deep-Gray, #5b5b5b);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.025rem;
`;

export default AgreePolicyPage;
