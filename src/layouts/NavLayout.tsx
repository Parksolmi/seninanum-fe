import { Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';
import useUserInfo from '../hooks/useUserInfo';
// import useUserState from '../store/UserState';

const NavLayout = () => {
  // const { userState } = useUserState();
  // const userId = userState.userId;
  const userId = '3522001522'; //test데이터 넣어보기

  const userType = useUserInfo(userId);
  console.log(userType);
  if (!userType) return <div>Loading...</div>; // 사용자 타입이 로드될 때까지 로딩 표시

  return (
    <>
      <Padding>
        <Outlet context={{ userType }} />
      </Padding>
      <TabBar type={userType} />
    </>
  );
};

export default NavLayout;

const Padding = styled.div`
  padding-bottom: 74px;
`;
