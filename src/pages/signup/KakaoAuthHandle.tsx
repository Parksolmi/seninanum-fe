import { instance } from '../../api/instance';
import React, { useEffect } from 'react';
import { login } from '../../store/LoginState';
import useUserState from '../../store/UserState';

const KakaoAuthHandle = () => {
  const { setUserState } = useUserState();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      try {
        const response = await instance.get(`/kakao/oauth/token?code=${code}`);

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
    <>
      <div>로그인 중입니다. 잠시만 기다려주세요.</div>
    </>
  );
};
export default KakaoAuthHandle;
