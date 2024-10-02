import React, { useEffect } from 'react';
import styled from 'styled-components';

const SignupIndexPage = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV_REDIRECT_URI
      : process.env.REACT_APP_PRD_REDIRECT_URI;
  const KAKAO_AUTH_PATH = 'https://kauth.kakao.com/oauth/authorize';

  const kakaoURL = `${KAKAO_AUTH_PATH}?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  //상태바 색상 변경
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#FF314A');
    }
  }, []);

  return (
    <WrapContent>
      <WrapLogo>
        <img src="/assets/signIn/seni-text-logo.png" alt="logo" />
      </WrapLogo>
      <KakaoButton onClick={handleLogin}>
        <img src="/assets/signIn/kakao-logo.png" alt="kakao-logo" />
        카카오톡으로 계속하기
      </KakaoButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1rem;
`;

const WrapLogo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 30%;

  img {
    width: 13rem;
  }
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  /* border: 4px solid #fff293; */
  border: none;
  background-color: #ffec00;
  border-radius: 0.625rem;

  height: 3.75rem;
  font-family: 'NanumSquareR';
  font-size: 1.4375rem;

  margin-top: 36rem;

  img {
    width: 45px;
  }
`;

export default SignupIndexPage;
