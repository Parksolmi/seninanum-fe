import React, { useState, useEffect } from 'react';
import userTypeStore from '../../store/userState';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';
import { instance } from '../../api/instance';

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
