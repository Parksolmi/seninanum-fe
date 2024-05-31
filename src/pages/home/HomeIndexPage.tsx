import React, { useState } from 'react';
// import Toggle from '../../components/signup/Toggle';
import UserTypeButton from '../../components/signin/UserTypeButton';
import ApplyMyRecruit from '../../components/home/ApplyMyRecruit';
import ShortcutButton from '../../components/common/ShortcutButton';
import RecommendDongCard from './RecommendDongCard';
import RecommendDongCardDetail from './RecommendDongCardDetail';

const HomeIndexPage: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handleButtonClick = (name: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === name ? null : name
    );
  };
  return (
    <>
      <h1>홈페이지</h1>
      <ApplyMyRecruit />
      <ShortcutButton />
      <RecommendDongCard />
      <RecommendDongCardDetail />
    </>
  );
};

export default HomeIndexPage;
