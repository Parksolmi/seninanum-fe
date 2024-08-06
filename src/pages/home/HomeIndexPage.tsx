import React from 'react';
import userTypeStore from '../../store/userTypeState';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

const HomeIndexPage: React.FC = () => {
  const { userType } = userTypeStore();
  const img1 = 'banner-image1.svg';
  const img2 = 'banner-image2.svg';
  const img3 = 'banner-image3.svg';
  const img4 = 'banner-image4.svg';
  const img5 = 'banner-image5.svg';
  const img6 = 'banner-image6.svg';
  const img7 = 'banner-image7.svg';
  const img8 = 'banner-image8.svg';

  const bannerImgArr = [img1, img2, img3, img4, img5, img6, img7, img8];
  const randomIndex = Math.floor(Math.random() * bannerImgArr.length);
  const randomImg = bannerImgArr[randomIndex];
  return (
    <>
      {userType === 'dong' ? (
        <HomeIndexPageDong randomImg={randomImg} />
      ) : (
        <HomeIndexPageNari randomImg={randomImg} />
      )}
    </>
  );
};

export default HomeIndexPage;
