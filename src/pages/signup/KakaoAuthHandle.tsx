import React, { useEffect } from 'react';
import styled from 'styled-components';
import { login } from '../../store/LoginState';
import useUserStore from '../../store/UserState';
import { instance } from '../../api/instance';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const KakaoAuthHandle = () => {
  const navigate = useNavigate();
  const { setUserState } = useUserStore();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');

    // 카카오 사용자 정보 요청
    const kakaoLogin = async () => {
      try {
        const response = await instance.get(`/auth/kakao?code=${code}`);

        let userData = response.data;
        console.log(response.data);

        // KakaoAuthHandle
        setUserState({
          userId: userData.id,
          nickname: userData.kakao_account.profile.nickname,
          profile: userData.kakao_account.profile.profile_image_url,
        });

        const userState = await login(userData.id);
        if (userState === 'LOGIN') navigate('/home');
        else navigate('/signup/usertype');
      } catch (err) {
        console.log('error', err);
      }
    };
    kakaoLogin();
  }, [setUserState, navigate]);

  return (
    <WrapContent>
      <SyncLoader color="#ffe810" />
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
