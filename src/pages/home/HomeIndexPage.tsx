import React, { useEffect } from 'react';
import userTypeStore from '../../store/userTypeState';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

const HomeIndexPage: React.FC = () => {
  const { userType } = userTypeStore();

  //확인용
  useEffect(() => {
    console.log('현재 노드', process.env.NODE_ENV);
  }, []);

  return (
    <>{userType === 'dong' ? <HomeIndexPageDong /> : <HomeIndexPageNari />}</>
  );
};

export default HomeIndexPage;
