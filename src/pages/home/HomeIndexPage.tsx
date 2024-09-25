import React, { useState, useEffect } from 'react';
import userTypeStore from '../../store/userTypeState';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';
import { instance } from '../../api/instance';

const HomeIndexPage: React.FC = () => {
  const { userType } = userTypeStore();

  const [progressStep, setProgressStep] = useState<number>(0);

  useEffect(() => {
    const fetchProfileProgress = async () => {
      try {
        const response = await instance.get(`/user/userType`);
        setProgressStep(response.data.career.progressStep);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileProgress(); // profileId가 존재할 때만 호출
  }, [setProgressStep]); // profileId가 변경될 때 useEffect가 실행됨
  return (
    <>
      {userType === 'dong' ? (
        <HomeIndexPageDong progressStep={progressStep} />
      ) : (
        <HomeIndexPageNari />
      )}
    </>
  );
};

export default HomeIndexPage;
