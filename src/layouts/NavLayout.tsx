import { Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';
import { useFetchUserType } from '../hooks/useFetchUserType';

const NavLayout = () => {
  const { data: user } = useFetchUserType();

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
