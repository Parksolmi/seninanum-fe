import React, { useState } from 'react';
import styled from 'styled-components';
import InputText from '../../components/common/InputText';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/loginState';
import { ADMIN } from '../../constants/adminInfo';

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleIdChange = (e) => {
    setId(e.target.value);
    validateCredentials(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateCredentials(id, e.target.value);
  };

  const validateCredentials = (inputId, inputPassword) => {
    const isValid = Object.values(ADMIN).some(
      (admin) => admin.id === inputId && admin.password === inputPassword
    );

    setIsDisabled(!isValid);
  };

  const handleLogin = async () => {
    try {
      const matchedAdmin = Object.values(ADMIN).find(
        (admin) => admin.id === id && admin.password === password
      );

      if (matchedAdmin) {
        const userId = matchedAdmin.userId;

        // 로그인 API 호출
        const userState = await login(userId);

        if (userState === 'LOGIN') {
          navigate('/home');
        } else {
          console.log('로그인에 실패했습니다. 다시 시도해 주세요.');
        }
      } else {
        console.log('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WrapContent>
      <WrapInput>
        <Title>관리자 계정</Title>
        <InputText
          userType={'dong'}
          label="아이디"
          value={id}
          onChange={handleIdChange}
        />
        <InputText
          userType={'dong'}
          label="비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />
      </WrapInput>
      <Button disabled={isDisabled} onClick={handleLogin} userType={'dong'}>
        로그인
      </Button>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
`;

const Title = styled.div`
  margin-bottom: 0.5rem;
  font-family: 'NanumSquareR';
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: 0.0275rem;
`;

const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  width: 100%;
`;

export default AdminLoginPage;
