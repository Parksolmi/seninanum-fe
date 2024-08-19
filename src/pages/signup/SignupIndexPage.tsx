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
    <WrapContent>
      <Logo src="/assets/signIn/seni-logo.png" alt="시니나눔 로고" />
      {/* <CatchPhrase>
        은퇴 이후 신나는 일상!
        <br /> 시니어들의 재능 나눔 서비스
      </CatchPhrase> */}
      <KakaoButton onClick={handleLogin}>
        <img src="/assets/signIn/kakao-logo.png" alt="카카오 로고" />
        카카오톡 로그인하기
      </KakaoButton>
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

const Logo = styled.img`
  width: 70%;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  border: none;
  border-radius: 0.625rem;
  background: #ffe810;
  color: black;
  height: 3.75rem;
  font-family: 'NanumSquareR';
  font-size: 1.4375rem;

  img {
    width: 45px;
  }
`;

export default SignupIndexPage;
