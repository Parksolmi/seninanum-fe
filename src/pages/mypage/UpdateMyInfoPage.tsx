import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import userTypeStore from '../../store/userState';
import PrevHeader from '../../components/header/PrevHeader';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Toggle from '../../components/signup/Toggle';
import InputText from '../../components/common/InputText';
import { instance } from '../../api/instance';

interface Inputs {
  nickname: string;
  gender: string;
  birthYear: string;
}

const UpdateMyInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = userTypeStore();
  const [userState, setUserState] = useState({
    nickname: '',
    gender: '',
    birthYear: '',
    profile: '',
  });

  // 기본 정보 조회 api 호출
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get(`/user/profile`);
        setUserState({
          nickname: res.data[0].nickname,
          gender: res.data[0].gender,
          birthYear: res.data[0].birthYear,
          profile: res.data[0].profile,
        });
      } catch (err) {
        console.error('기본정보 조회에 실패하였습니다.');
      }
    };
    fetchProfile();
  }, [setUserState]);

  const { register, handleSubmit } = useForm<Inputs>({
    shouldUseNativeValidation: true,
  });

  const onSubmit = () => {};
  return (
    <>
      <WrapContent>
        <PrevHeader title={'프로필 수정'} navigateTo={'-1'} />
        <ShowInfoText>
          {userType === 'dong'
            ? '동백님의 정보를 알려주세요!'
            : '나리님의 정보를 알려주세요!'}
        </ShowInfoText>
        <ShowSecondInfoText>
          {userType === 'dong'
            ? '나리님에게 보여지는 정보예요.'
            : '동백님에게 보여지는 정보예요.'}
        </ShowSecondInfoText>

        <ProfileImgaeArea>
          <WrapProfile>
            <img src={userState.profile} alt="profile" />
          </WrapProfile>
          <CameraIcon
            src={`/assets/home/edit-image.svg`}
            alt="camera"
          ></CameraIcon>
        </ProfileImgaeArea>

        <WrapFrom onSubmit={handleSubmit(onSubmit)}>
          <InputText
            userType={userType}
            label="이름/닉네임"
            placeholder="이름 혹은 닉네임을 입력해주세요."
            defaultValue={userState.nickname ? userState.nickname : ''}
            register={register('nickname', {
              validate: (value) =>
                value.length < 5 || '5자리 이하로 지어주세요!',
            })}
          />
          <Toggle
            userType={userType}
            label="성별"
            options={['남성', '여성']}
            register={register('gender')}
            defaultValue={userState.gender}
          />
          <InputText
            userType={userType}
            label="출생년도"
            placeholder="예시) 1876"
            register={register('birthYear', {
              validate: (value) =>
                /^[0-9]{4}$/.test(value) || '4자리 숫자를 입력하세요!',
            })}
            value={userState.birthYear}
          />
          {/* <InputSubmit
          $userType={userState.userType}
          type="submit"
          value="수정완료하기"
          disabled={!isValid}
        /> */}
          {/* 버튼 */}
          <WrapButtonContainer>
            <WrapButton>
              <Button
                type="submit"
                disabled={false}
                userType={userType}
                onClick={() => navigate(`/mypage`)}
              >
                수정완료하기
              </Button>
            </WrapButton>
          </WrapButtonContainer>
        </WrapFrom>
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

const ShowInfoText = styled.div`
  color: #000;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.03rem;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
`;

const ShowSecondInfoText = styled.div`
  color: #5b5b5b;
  font-size: 1.125rem;
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

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default UpdateMyInfoPage;
