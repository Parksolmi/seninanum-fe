import React from 'react';
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

  return (
    <Background>
      <KakaoButton onClick={handleLogin}>
        <img src="/assets/signIn/kakao-logo.png" alt="kakao-logo" />
        카카오톡으로 계속하기
      </KakaoButton>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('/assets/signIn/signIn-bg.png');
  background-size: cover;
  background-position: center;
  padding: 0 1rem;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  border: 4px solid #fff293;
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
