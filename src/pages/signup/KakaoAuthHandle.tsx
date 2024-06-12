import React, { useEffect } from 'react';
import styled from 'styled-components';
import { login } from '../../store/LoginState';
import useUserState from '../../store/UserState';
import { instance } from '../../api/instance';
import { SyncLoader } from 'react-spinners';

const KakaoAuthHandle = () => {
  const { setUserState } = useUserState();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      try {
        const response = await instance.get(`/auth/kakao/token?code=${code}`);

        let userData = response.data;
        console.log(response.data);

        setUserState({
          userId: userData.id,
          nickname: userData.kakao_account.profile.nickname,
          profile: userData.kakao_account.profile.profile_image_url,
        });

        login(userData.id);
      } catch (err) {
        console.log('error', err);
      }
    };
    kakaoLogin();
  }, [setUserState]);

  return (
    <WrapContent>
      <SyncLoader color="#FFAA0E" />
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default KakaoAuthHandle;
