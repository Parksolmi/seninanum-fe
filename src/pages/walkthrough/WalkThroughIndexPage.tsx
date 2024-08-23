import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import AssetArray from './AssetArray';
import { useNavigate } from 'react-router-dom';

const WalkThroughIndexPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlide = 4;

  const handleBeforeChange = (oldIdx, newIdx) => {
    setCurrentSlide(newIdx);
  };
  const navigateToHome = () => {
    navigate('/home');
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    if (currentSlide === 0) return null;
    return (
      <PrevBtn onClick={onClick}>
        <PrevBtnImg src="/assets/common/back-icon.svg" />
      </PrevBtn>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <>
        <WrapButtonContainer onClick={onClick}>
          <WrapButton>
            <Button
              children={currentSlide === totalSlide - 1 ? '시작하기' : '다음'}
              disabled={false}
              userType={'dong'}
              onClick={
                currentSlide === totalSlide - 1 ? navigateToHome : onClick
              }
            ></Button>
          </WrapButton>
        </WrapButtonContainer>
      </>
    );
  };
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: handleBeforeChange, // 슬라이드 변경 전 호출
    nextArrow: <CustomNextArrow />, // 커스텀 다음 버튼 적용
    prevArrow: <CustomPrevArrow />, // 커스텀 이전 버튼 적용
    appendDots: (dots: React.ReactNode) => (
      <CustomDots>
        <ul> {dots} </ul>
      </CustomDots>
    ),
    dotsClass: 'dots_custom',
  };

  return (
    <WrapContent>
      <TitleArea>
        <TitleText>가입완료</TitleText>
      </TitleArea>
      <StyledSlider {...sliderSettings}>
        <AssetArray userType={'dong'} index={1}></AssetArray>
        <AssetArray userType={'dong'} index={2}></AssetArray>
        <AssetArray userType={'dong'} index={3}></AssetArray>
        <AssetArray userType={'dong'} index={4}></AssetArray>
      </StyledSlider>
      <GapButton />
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
const StyledSlider = styled(Slider)`
  .slick-list {
    //크기조정
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-loading .slick-list {
    background: #fff url('./ajax-loader.gif') center center no-repeat;
  }
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .dots_custom {
    margin-left: -18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dots_custom li {
    list-style: none;
    display: inline-block;
    margin: 0 10px;
    padding: 0;
  }

  .dots_custom li button {
    border: none;
    background: #d9d9d9;
    color: transparent;
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 100%;
    padding: 0;
  }

  .dots_custom li.slick-active button {
    background-color: #ff314a;
  }
`;
const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
`;

const PrevBtn = styled.div`
  position: absolute;
  top: -22px;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const PrevBtnImg = styled.img`
  color: #000;
  text-align: center;
  align-items: center;
  font-family: NanumSquare;
  font-size: 22px;
  font-weight: 400;
`;

const TitleText = styled.div`
  display: flex;
  color: #000;
  text-align: center;
  align-items: center;
  font-family: NanumSquare;
  font-size: 22px;
  font-weight: 400;
`;

const CustomDots = styled.div`
  width: 100%;
  position: relative;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GapButton = styled.div`
  margin-bottom: 10rem;
`;

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
  z-index: 10;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default WalkThroughIndexPage;
