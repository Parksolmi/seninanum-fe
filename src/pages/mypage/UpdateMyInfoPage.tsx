import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Toggle from '../../components/signup/Toggle';
import InputText from '../../components/common/InputText';
import { instance } from '../../api/instance';
import { useFetchMyProfile } from '../../hooks/useFetchProfile';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { scaleImage } from '../../utils/scaleImage';

// User 인터페이스 정의
interface User {
  nickname: string;
  gender: '여성' | '남성';
  birthYear: string;
  profile: string;
}

const UpdateMyInfoPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: user } = useFetchUserType();
  const { data: profile } = useFetchMyProfile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile?.profile || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: {
      nickname: profile?.nickname,
      gender: profile?.gender,
      birthYear: profile?.birthYear,
      profile: profile?.profile,
    },
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
        setValue('profile', s3Link.data);
      } catch (error) {
        console.error('수정 실패:', error);
      }
    }
  };

  // 폼 제출 함수
  const onSubmit = async (data: User) => {
    try {
      instance.patch('/user/profile', {
        nickname: data.nickname,
        gender: data.gender,
        birthYear: data.birthYear,
        profile: data.profile,
      });

      navigate(`/view/myprofile/${user?.userType}`);
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  return (
    <>
      <PrevHeader title={'프로필 수정'} navigateTo={'-1'} />
      <WrapContent>
        {user?.userType === 'dong' ? (
          <WrapText>
            <h1>동백님의 정보를 알려주세요!</h1>
            <p>나리님에게 보여지는 정보예요.</p>
          </WrapText>
        ) : (
          <WrapText>
            <h1>나리님의 정보를 알려주세요!</h1>
            <p>동백님에게 보여지는 정보예요.</p>
          </WrapText>
        )}

        {profile && (
          <WrapFrom onSubmit={handleSubmit(onSubmit)}>
            <ProfileImgaeArea>
              <WrapProfile>
                <img src={previewUrl || profile.profile} alt="profile" />
              </WrapProfile>
              <CameraIcon
                src={`/assets/home/edit-image.svg`}
                alt="camera"
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileSelect}
              />
            </ProfileImgaeArea>

            <InputText
              userType={user?.userType || null}
              label="이름/닉네임"
              placeholder="이름 혹은 닉네임을 입력해주세요."
              defaultValue={profile.nickname ? profile.nickname : ''}
              register={register('nickname', {
                required: '이름/닉네임은 필수입니다.',
                validate: (value) =>
                  value.length < 5 || '5자리 이하로 지어주세요!',
              })}
            />
            <Toggle
              userType={user?.userType || null}
              label="성별"
              options={['남성', '여성']}
              register={register('gender', {
                required: '성별은 필수입니다.',
              })}
              defaultValue={profile.gender}
            />
            <InputText
              userType={user?.userType || null}
              label="출생년도"
              placeholder="예시) 1876"
              register={register('birthYear', {
                required: '출생년도는 필수입니다.',
                validate: (value) =>
                  /^[0-9]{4}$/.test(value) || '4자리 숫자를 입력하세요!',
              })}
              defaultValue={profile.birthYear}
            />
            <Button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              userType={user?.userType || null}
            >
              수정완료하기
            </Button>
          </WrapFrom>
        )}
      </WrapContent>
    </>
  );
};
const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.1rem;
  margin-bottom: 1.5rem;
  .last-content {
    margin-bottom: 7rem;
  }
`;

const WrapText = styled.div`
  h1 {
    color: #000;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.03rem;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
  }

  p {
    color: #5b5b5b;
    font-size: 1.125rem;
  }
`;

const ProfileImgaeArea = styled.div`
  position: relative;
  margin-top: 1.3rem;
`;

const WrapProfile = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
  img {
    width: 7.35rem;
    height: 7.35rem;
    background-color: gray;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const CameraIcon = styled.img`
  position: absolute;
  left: 55%;
  bottom: 0%;
  z-index: 5;
`;

const WrapFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

export default UpdateMyInfoPage;
