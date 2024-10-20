import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import AssetArray from './AssetArray';
import { useNavigate } from 'react-router-dom';
import { useFetchUserType } from '../../hooks/useFetchUserType';

const WalkThroughIndexPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlide = 4;
  const { data: user } = useFetchUserType();

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
              userType={user?.userType || null}
              onClick={
                currentSlide === totalSlide - 1 ? navigateToHome : onClick
              }
            />
          </WrapButton>
          <SkipButton onClick={() => navigate('/home')}>건너뛰기</SkipButton>
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
      <StyledSlider $userType={user?.userType} {...sliderSettings}>
        <AssetArray userType={user?.userType || ''} index={1}></AssetArray>
        <AssetArray userType={user?.userType || ''} index={2}></AssetArray>
        <AssetArray userType={user?.userType || ''} index={3}></AssetArray>
        <AssetArray userType={user?.userType || ''} index={4}></AssetArray>
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dots_custom li {
    list-style: none;
    display: inline-block;
    margin: 0 10px;
  }

  .dots_custom li button {
    border: none;
    background: #d9d9d9;
    color: transparent;
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 100%;
  }

  .dots_custom li.slick-active button {
    background-color: ${({ $userType }) =>
      $userType === 'dong' ? '#ff314a' : '#FFD111'};
  }
`;
const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
`;

const PrevBtn = styled.div`
  position: absolute;
  top: -25px;
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
  font-size: 1.375rem;
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

const SkipButton = styled.div`
  color: var(--Base-Gray, #8e8e8e);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  margin-top: 1rem;
`;

export default WalkThroughIndexPage;
