import React from 'react';
import userTypeStore from '../../store/userState';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

const HomeIndexPage: React.FC = () => {
  const { userType, profileStep } = userTypeStore();

  return (
    <>
      {userType === 'dong' ? (
        <HomeIndexPageDong progressStep={profileStep} />
      ) : (
        <HomeIndexPageNari />
      )}
    </>
  );
};

export default HomeIndexPage;
