import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../../components/header/ExitHeader';
import { EVENT_FIELD_LIST } from '../../constants/eventFieldList';
import FieldAssetArray from '../../components/event/FieldAssetArray';
import Slider from 'react-slick';
import { useEventSelectedField } from '../../store/eventSelectField';

const SelectFieldPage = () => {
  const navigate = useNavigate();
  const { setSelectedIndex } = useEventSelectedField();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (oldIdx, newIdx) => {
    setCurrentSlide(newIdx);
  };

  const handleSelectField = () => {
    setSelectedIndex(currentSlide);
    navigate('/community/event/draw');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: '15%',
    beforeChange: handleBeforeChange, // 슬라이드 변경 전 호출
    appendDots: (dots: React.ReactNode) => <CustomDots>{dots}</CustomDots>,
    dotsClass: 'dots_custom',
  };

  return (
    <>
      <WrapHeader>
        <ExitHeader
          navigateTo="/community"
          userType={'dong'}
          backgroundColor="#f0e0c9"
          content=""
        />
      </WrapHeader>
      <WrapContent>
        <h1>
          먼저 노하우를 받고 싶은 <br /> 분야를 선택하세요!
        </h1>
        <StyledSlider {...sliderSettings}>
          {EVENT_FIELD_LIST.map((field) => (
            <FieldAssetArray field={field}></FieldAssetArray>
          ))}
        </StyledSlider>
        <StyledButton children="선택" onClick={handleSelectField} />
      </WrapContent>
    </>
  );
};

const WrapHeader = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.3rem;
  z-index: 99;
`;
const WrapContent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0e0c9;
  padding: 1.3rem 1.1rem;

  display: flex;
  flex-direction: column;

  h1 {
    color: #000;
    text-align: center;
    font-family: 'NanumSquare';
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 7rem;
  }
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 13.4375rem;
  height: 4.25rem;
  flex-shrink: 0;

  color: #fff;
  font-family: 'NanumSquare';
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border-radius: 0.875rem;

  position: fixed;
  left: 50%;
  bottom: 3rem;
  transform: translateX(-50%);

  background-color: var(--Primary-dong);
`;

const StyledSlider = styled(Slider)`
  margin: 2rem 0;

  .slick-list {
    //크기조정
    width: 100%;
    height: 120%;
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

  .slick-center {
    transform: scale(1.2); /* 중앙 카드에 대한 scale 적용 */
    transition: transform 0.5s ease-in-out; /* 부드러운 scale 변화 */
  }

  .dots_custom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 1rem;
  }

  /* dots_custom 클래스 내 li 요소에 강제 적용 */
  .dots_custom li {
    list-style: none !important;
    display: inline-block !important;
    width: 15px !important;
    height: 15px !important;
    margin: 0 5px !important;
    padding: 0 !important;
    flex-shrink: 0 !important;
  }

  .dots_custom li button {
    border: none !important;
    background: #ffffff !important;
    color: transparent !important;
    width: 10px !important;
    height: 10px !important;
    aspect-ratio: 1 !important;
    border-radius: 50% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .dots_custom li.slick-active button {
    background-color: #a89172 !important;
  }
`;

const CustomDots = styled.div`
  width: 100%;
  position: relative;
  width: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SelectFieldPage;
