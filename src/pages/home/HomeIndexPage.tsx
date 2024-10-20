import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

interface OutletContext {
  userType: string;
  career: number;
}

const HomeIndexPage: React.FC = () => {
  const { userType, career } = useOutletContext<OutletContext>();

  return (
    <>
      {userType === 'dong' ? (
        <HomeIndexPageDong progressStep={career} />
      ) : (
        <HomeIndexPageNari />
      )}
    </>
  );
};

export default HomeIndexPage;
