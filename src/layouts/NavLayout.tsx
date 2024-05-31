import { Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';

const NavLayout: React.FC = () => {
  return (
    <>
      <Padding>
        <Outlet />
      </Padding>
      <TabBar type={'dong'} />
    </>
  );
};

export default NavLayout;

const Padding = styled.div`
  padding-bottom: 74px;
`;
