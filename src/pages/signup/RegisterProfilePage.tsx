import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import InputText from '../../components/common/InputText';
import Toggle from '../../components/signin/Toggle';

const RegisterProfilePage: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [profileData, setProfileData] = useState<Object>({
    nickname: '',
    gender: '',
    birth: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setProfileData((prev) => ({ ...prev, gender: selectedGender }));
  }, [selectedGender]);

  const isDisabled = Object.values(profileData).some((value) => value === '');

  return (
    <>
      <HeaderText>나리님의 정보를 알려주세요!</HeaderText>
      <WrapFrom>
        <InputText
          name="nickname"
          onChange={handleOnChange}
          label="이름/닉네임"
          placeholder="이름 혹은 닉네임을 입력해주세요."
        ></InputText>
        <Toggle options={['남성', '여성']} setState={setSelectedGender} />
        <InputText
          name="birth"
          onChange={handleOnChange}
          label="출생년도"
          placeholder="태어나신 연도를 입력해주세요."
        ></InputText>
      </WrapFrom>
      <WrapButton>
        <Button disabled={isDisabled} type={'동백'}>
          완료하기
        </Button>
      </WrapButton>
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
  font-family: Nanum_Square;
`;
const WrapFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
  font-family: Nanum_Square;
`;
const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 5rem;
`;

export default RegisterProfilePage;
