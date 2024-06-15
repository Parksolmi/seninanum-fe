import { Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';

const NavLayout = () => {
  return (
    <>
      <Padding>
        <Outlet context={'dong'} />
      </Padding>
      <TabBar type={'dong'} />
    </>
  );
};

export default NavLayout;

const Padding = styled.div`
  padding-bottom: 74px;
`;
