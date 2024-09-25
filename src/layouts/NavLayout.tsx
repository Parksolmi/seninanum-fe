import { Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';

const NavLayout = () => {
  return (
    <>
      <Padding>
        <Outlet />
      </Padding>
      <TabBar />
    </>
  );
};

export default NavLayout;

const Padding = styled.div`
  padding-bottom: 74px;
`;
