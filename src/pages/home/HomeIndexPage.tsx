import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

const HomeIndexPage: React.FC = () => {
  const { userType } = useOutletContext<{ userType: 'dong' | 'nari' }>();
  return (
    <>{userType === 'dong' ? <HomeIndexPageDong /> : <HomeIndexPageNari />}</>
  );
};

export default HomeIndexPage;
