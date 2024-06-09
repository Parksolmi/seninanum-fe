import React from 'react';
import styled from 'styled-components';

const SignupIndexPage = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_PATH = 'https://kauth.kakao.com/oauth/authorize';

  const kakaoURL = `${KAKAO_AUTH_PATH}?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <WrapContent>
      <button onClick={handleLogin}>카카오톡 로그인하기</button>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    height: 50px;
    margin-top: 50vh;
  }
`;

export default SignupIndexPage;
