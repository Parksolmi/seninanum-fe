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
      <WrapLogo>
        <img
          className="image-logo"
          src="/assets/signIn/image-logo.png"
          alt="logo"
        />
        <div>
          <p>신나는 재능나눔 서비스</p>
          <img
            className="text-logo"
            src="/assets/signIn/text-logo.png"
            alt="logo"
          />
        </div>
      </WrapLogo>
      {/* 관리자 계정 버튼 */}
      {/* <AdminButton onClick={() => navigate('/signup/admin')}>
        관리자 계정으로 접속하기
      </AdminButton> */}
      <KakaoButton onClick={handleLogin}>
        <img src="/assets/signIn/kakao-icon.png" alt="kakao-logo" />
        카카오톡으로 시작하기
      </KakaoButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1rem;
`;

const WrapLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.8rem;
  justify-content: center;
  margin-top: 13rem;

  .image-logo {
    width: 5.8rem;
  }
  .text-logo {
    width: 11.6rem;
  }
  p {
    color: #000;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.0225rem;
    text-align: center;
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
  background-color: #fbe84c;
  border-radius: 0.625rem;

  height: 3.75rem;
  font-family: 'NanumSquareR';

  color: var(--Base-Black, #000);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 6.25rem;

  img {
    width: 1.5rem;
  }
`;

// const AdminButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1rem;

//   width: 100%;
//   /* border: 4px solid #fff293; */
//   border: none;
//   background-color: #ff314a;
//   border-radius: 0.625rem;

//   height: 3.75rem;
//   font-family: 'NanumSquareR';

//   color: var(--Base-Black, #fff);
//   text-align: center;
//   font-family: NanumSquare;
//   font-size: 1.375rem;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;

//   margin-top: 6.25rem;
//   margin-bottom: -4rem;
// `;

export default SignupIndexPage;
