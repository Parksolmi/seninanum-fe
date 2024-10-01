import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import userTypeStore from '../../store/userState';

const CompleteSignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { nickname, userType } = location.state || {};

  const { setUserType } = userTypeStore();

  // 렌더링 후 2초 뒤에 페이지 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserType(userType);
      navigate('/walkthrough');
    }, 2000);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <WrapContent>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <img
          src={`/assets/signIn/complete-${userType}.png`}
          alt="회원가입 완료"
        />
      </motion.div>
      <p>
        {nickname} {userType === 'dong' ? '동백' : '나리'}님
        <br />
        시니나눔 가입을 완료했어요
      </p>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1.5rem;

  img {
    width: 5rem;
  }
  p {
    color: #000;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.0275rem;
    padding-bottom: 10%;
  }
`;

export default CompleteSignupPage;
