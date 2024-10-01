import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useUserState from '../../store/userSignupState';
import { instance } from '../../api/instance';
import { login } from '../../store/loginState';
import { useForm } from 'react-hook-form';
import Toggle from '../../components/signup/Toggle';
import InputText from '../../components/common/InputText';
import PrevHeader from '../../components/header/PrevHeader';

interface Inputs {
  nickname: string;
  gender: string;
  birthYear: string;
}

const RegisterProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const { userState } = useUserState();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    shouldUseNativeValidation: true,
  });

  //회원가입
  const onSubmit = async (data) => {
    try {
      await instance.post('/auth/signup', {
        userId: userState.userId,
        userType: userState.userType,
        nickname: data.nickname,
        gender: data.gender,
        birthYear: data.birthYear,
        profile: userState.profile,
      });
      navigate('/home');

      login(userState.userId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WrapContent>
      <PrevHeader title="회원가입" navigateTo="/signup/policy" />
      <Title>
        {userState.userType === 'dong' ? '동백' : '나리'}님의 정보를 알려주세요!
      </Title>
      <WrapFrom onSubmit={handleSubmit(onSubmit)}>
        <WrapImageInput>
          <label>프로필 사진</label>
          <p>
            얼굴이 잘 나온 사진은
            <br />
            상대에게 좋은 인상을 줄 수 있어요!
          </p>
          <img className="profile" src={userState.profile} alt="profile" />
        </WrapImageInput>

        <InputText
          userType={userState.userType}
          label="이름/닉네임"
          placeholder="이름 혹은 닉네임을 입력해주세요."
          defaultValue={userState.nickname ? userState.nickname : ''}
          register={register('nickname', {
            validate: (value) => value.length < 5 || '5자리 이하로 지어주세요!',
          })}
        />
        <Toggle
          userType={userState.userType}
          label="성별"
          options={['남성', '여성']}
          register={register('gender')}
        />
        <InputText
          userType={userState.userType}
          label="출생년도"
          placeholder="예시) 1876"
          register={register('birthYear', {
            validate: (value) =>
              /^[0-9]{4}$/.test(value) || '4자리 숫자를 입력하세요!',
          })}
        />
        <InputSubmit
          $userType={userState.userType}
          type="submit"
          value="완료하기"
          disabled={!isValid}
        />
      </WrapFrom>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
`;
const Title = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-family: 'NanumSquareR';
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: 0.0275rem;
`;
const WrapFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WrapImageInput = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    font-family: Nanum_Square;
  }

  p {
    color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 0.5rem;
  }

  .profile {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-top: 1.12rem;
    object-fit: cover;
    background-color: lightgray;
  }
`;

const InputSubmit = styled.input<{ $userType: string }>`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1.875rem;

  height: 3.7rem;
  text-align: center;
  font-size: 1.375rem;
  font-weight: 800;
  border: none;
  border-radius: 0.625rem;

  transition: background-color 0.5s ease;

  &:disabled {
    background-color: #d9d9d9;
    color: #333333;
  }

  color: ${({ $userType }) => ($userType === null ? '#5B5B5B' : '#ffffff')};
  background-color: ${({ $userType }) =>
    $userType !== null
      ? $userType === 'dong'
        ? `var(--Primary-dong)`
        : `var(--Primary-nari)`
      : '#EBECEB'};
`;

export default RegisterProfilePage;
