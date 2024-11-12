import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';
import { useFetchUserType } from '../hooks/useFetchUserType';

const NavLayout = () => {
  const { data: user } = useFetchUserType();

  // 비로그인시 로그인 페이지로 리다이렉트
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      alert('로그인이 필요합니다!');
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Padding>
        <Outlet context={{ userType: user?.userType, career: user?.career }} />
      </Padding>
      <TabBar userType={user?.userType} />
    </>
  );
};

export default NavLayout;

const Padding = styled.div`
  padding-bottom: 74px;
`;
