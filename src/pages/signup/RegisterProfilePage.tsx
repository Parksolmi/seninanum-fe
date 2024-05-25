import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputText from '../../components/common/InputText';
import Toggle from '../../components/signin/Toggle';

const RegisterProfilePage: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    console.log(selectedGender);
  }, [selectedGender]);

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
      <HeaderText>나리님의 정보를 알려주세요!</HeaderText>
      <WrapFrom>
        <InputText
          label="이름/닉네임"
          placeholder="이름 혹은 닉네임을 입력해주세요."
        ></InputText>

        <Toggle options={['남성', '여성']} setState={setSelectedGender} />

        <InputText
          label="출생년도"
          placeholder="태어나신 연도를 입력해주세요."
        ></InputText>
      </WrapFrom>
    </>
  );
};

const HeaderText = styled.div`
  margin-top: 2.25rem;
  margin-bottom: 0.75rem;
  color: #000;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.03rem;
  font-family: NanumSquareB;
`;
const WrapFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
`;

export default RegisterProfilePage;
