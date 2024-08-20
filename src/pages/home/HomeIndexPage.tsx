import React from 'react';
import userTypeStore from '../../store/userTypeState';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

const HomeIndexPage: React.FC = () => {
  const { userType } = userTypeStore();
  return (
    <>{userType === 'dong' ? <HomeIndexPageDong /> : <HomeIndexPageNari />}</>
  );
};

export default HomeIndexPage;
