import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TabBar from '../components/common/TabBar';
import userTypeStore from '../store/userTypeState';
import { instance } from '../api/instance';

const NavLayout = () => {
  const { userType, setUserType } = userTypeStore();

  const getUserType = async () => {
    try {
      const response = await instance.get('/user/userType');
      setUserType(response.data);
    } catch (error) {
      console.error('ErError fetching user type:', error);
    }
  };

  useEffect(() => {
    getUserType();
  }, []);

  return (
    <>
      <Padding>
        <Outlet />
      </Padding>
      <TabBar userType={userType} getUserType={getUserType} />
    </>
  );
};

export default NavLayout;

const Padding = styled.div`
  padding-bottom: 74px;
`;
