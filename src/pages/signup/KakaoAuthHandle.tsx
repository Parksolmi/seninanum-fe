import axios from 'axios';
import React, { useEffect } from 'react';
import useUserState from '../../store/UserState';

const KakaoAuthHandle = (props) => {
  const { setUserState } = useUserState();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_API_URL}kakao/oauth/token?code=${code}`
        )
        .then((res) => {
          let userData = res.data.kakao_account.profile;

          setUserState({
            nickname: userData.nickname,
            profile: userData.profile_image_url,
          });

          // localStorage.setItem('token_body', res.body);

          window.location.href = '/signup/usertype';
        });
    };
    kakaoLogin();
  }, [setUserState, props.history]);

  return (
    <>
      <div>로그인 중입니다. 잠시만 기다려주세요.</div>
    </>
  );
};
export default KakaoAuthHandle;
