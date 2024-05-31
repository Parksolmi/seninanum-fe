import React, { useState } from 'react';
// import Toggle from '../../components/signup/Toggle';
import UserTypeButton from '../../components/signin/UserTypeButton';
import ApplyMyRecruit from '../../components/home/ApplyMyRecruit';
import WriteRecruitButton from '../../components/common/WriteRecruitButton';
import RecommendDongCard from './RecommendDongCard';
import RecommendDongCardDetail from './RecommendDongCardDetail';

const HomeIndexPage: React.FC = () => {
  // const [toggleState, setToggleState] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handleButtonClick = (name: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === name ? null : name
    );
  };
  return (
    <>
      <h1>홈페이지</h1>
      <UserTypeButton
        types="동백"
        isSelected={selectedButton === '동백'}
        onClick={handleButtonClick}
      ></UserTypeButton>
      <UserTypeButton
        types="나리"
        isSelected={selectedButton === '나리'}
        onClick={handleButtonClick}
      ></UserTypeButton>
      {/* <Button type="dong">버튼</Button> */}
      {/* <Toggle options={['남성', '여성']} setState={setToggleState} /> */}
      <ApplyMyRecruit></ApplyMyRecruit>

      <WriteRecruitButton></WriteRecruitButton>

      <RecommendDongCard></RecommendDongCard>

      <RecommendDongCardDetail></RecommendDongCardDetail>
    </>
  );
};

export default HomeIndexPage;
