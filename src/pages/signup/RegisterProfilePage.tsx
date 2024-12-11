import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useUserState from '../../store/userSignupState';
import { instance } from '../../api/instance';
import { login } from '../../store/loginState';
import { useForm } from 'react-hook-form';
import Toggle from '../../components/signup/Toggle';
import InputText from '../../components/common/InputText';
import PrevHeader from '../../components/header/PrevHeader';
import { scaleImage } from '../../utils/scaleImage';
import Button from '../../components/common/Button';

interface Inputs {
  nickname: string;
  gender: string;
  birthYear: string;
  telNum: string;
}

const RegisterProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const { userState, setUserState } = useUserState();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    userState?.profile || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  // 파일 선택 시 상태에 파일을 저장하고 미리보기 URL을 설정하는 함수
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let originalFile = e.target.files[0];

      // 이미지 크기를 50%로 줄임
      const scaledBlob = await scaleImage({
        file: originalFile,
        scale: 0.5,
        format: originalFile.type,
        quality: 0.7,
      });

      // Blob을 File로 변환
      const inputFile = new File([scaledBlob], originalFile.name, {
        type: originalFile.type,
      });

      try {
        const formData = new FormData();
        formData.append('image', inputFile);

        const s3Link = await instance.post('/image', formData);

        setPreviewUrl(URL.createObjectURL(inputFile));
        setUserState({ profile: s3Link.data });
      } catch (error) {
        console.error('수정 실패:', error);
      }
    }
  };

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
        telNum: data.telNum,
      });

      navigate('/signup/complete', {
        state: { nickname: data.nickname, userType: userState.userType },
      });

      login(userState.userId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PrevHeader title="회원가입" navigateTo="/signup/policy" />
      <WrapContent>
        <Title>
          {userState.userType === 'dong' ? '동백' : '나리'}님의 정보를
          알려주세요!
        </Title>
        <WrapFrom onSubmit={handleSubmit(onSubmit)}>
          <WrapImageInput>
            <label>프로필 사진</label>
            <p>
              얼굴이 잘 나온 사진은
              <br />
              상대에게 좋은 인상을 줄 수 있어요!
            </p>
            <WrapImage>
              <img
                className="profile"
                src={previewUrl || userState.profile}
                alt="profile"
              />
              <CameraIcon
                src={`/assets/home/edit-image.svg`}
                alt="camera"
                onClick={() => fileInputRef.current?.click()}
              />
            </WrapImage>
          </WrapImageInput>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileSelect}
          />

          <InputText
            userType={userState.userType}
            label="이름/닉네임"
            placeholder="이름 혹은 닉네임을 입력해주세요."
            defaultValue={userState.nickname || ''}
            register={register('nickname', {
              required: '이름 혹은 닉네임을 입력해주세요.',
              maxLength: {
                value: 5,
                message: '5자 이하로 입력해주세요!',
              },
            })}
            error={errors.nickname?.message}
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
            placeholder="예) 1990"
            register={register('birthYear', {
              validate: (value) =>
                /^[0-9]{4}$/.test(value) || '숫자 4자리로 입력해주세요!',
            })}
            error={errors.birthYear?.message}
          />

          <InputText
            userType={userState.userType}
            label="전화번호"
            placeholder="예) 01012341234"
            register={register('telNum', {
              validate: (value) => {
                const trimmedValue = value.replace(/\s|-/g, ''); // 공백과 - 제거
                return (
                  /^010[0-9]{8}$/.test(trimmedValue) ||
                  '전화번호를 입력해주세요'
                );
              },
            })}
            error={errors.telNum?.message}
          />

          <Button
            disabled={!isValid}
            userType={userState.userType}
            children="완료하기"
            type="submit"
          />
        </WrapFrom>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
  margin-bottom: 10rem;
`;
const Title = styled.div`
  margin-top: 2rem;
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

const WrapImage = styled.div`
  display: flex;
  width: 6.8rem;
  position: relative;
`;

const CameraIcon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0%;
  z-index: 5;
`;

export default RegisterProfilePage;
