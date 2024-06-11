import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputText from '../../components/common/InputText';
import Toggle from '../../components/signin/Toggle';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useUserState from '../../store/UserState';
import { instance } from '../../api/instance';
import { login } from '../../store/LoginState';

const RegisterProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useUserState();

  const [selectedGender, setSelectedGender] = useState<string>('');

  const isDisabled =
    userState.nickname === '' ||
    userState.gender === '' ||
    userState.birthYear === '';

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUserState({ [name]: value });
  };

  const onSignup = async () => {
    try {
      await instance.post('/signup', {
        userId: userState.userId,
        userType: userState.userType,
        nickname: userState.nickname,
        gender: userState.gender,
        birthYear: userState.birthYear,
        profile: userState.profile,
      });
      navigate('/home');

      login(userState.userId);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setUserState({ gender: selectedGender });
  }, [setUserState, selectedGender]);

  return (
    <WrapContent>
      <BackButton onClick={navigateBack}>
        <img src={'/assets/signIn/back-icon.svg'} alt="뒤로가기" />
      </BackButton>
      <HeaderText>나리님의 정보를 알려주세요!</HeaderText>
      <WrapFrom>
        <InputText
          name="nickname"
          value={userState.nickname}
          onChange={handleOnChange}
          label="이름/닉네임"
          placeholder="이름 혹은 닉네임을 입력해주세요."
        ></InputText>
        <Toggle options={['남성', '여성']} setState={setSelectedGender} />
        <InputText
          name="birthYear"
          onChange={handleOnChange}
          label="출생년도"
          placeholder="태어나신 연도를 입력해주세요."
        ></InputText>
      </WrapFrom>
      <WrapButton>
        <Button
          disabled={isDisabled}
          type={userState.userType}
          onClick={onSignup}
        >
          완료하기
        </Button>
      </WrapButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
`;
const BackButton = styled.div`
  margin-top: 1.81rem;
  img {
    width: 1.5rem;
  }
`;
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
  bottom: 4rem;
`;

export default RegisterProfilePage;
