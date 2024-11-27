import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../../components/header/ExitHeader';
import Lottie from 'react-lottie-player';
import drawAnimation from '../../components/lottie/drawAnimation.json';
import { motion } from 'framer-motion';
import DrawResult from '../../components/event/DrawResult';
import { useEventSelectedField } from '../../store/eventSelectField';
import { EVENT_FIELD_LIST } from '../../constants/eventFieldList';

const DrawPage = () => {
  const navigate = useNavigate();

  const { selectedIndex } = useEventSelectedField();
  const [isResultShow, setIsResultShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResultComponent, setShowResultComponent] = useState(false);

  const handleDrawButton = () => {
    setIsPlaying(true);
  };

  const handleCompleteAnimation = () => {
    setIsResultShow(true);
  };

  return (
    <>
      {isResultShow && (
        <ResultBall
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          onAnimationComplete={() => setShowResultComponent(true)}
        >
          <img
            className="ball"
            src={`/assets/event/${EVENT_FIELD_LIST[selectedIndex].name}.png`}
            alt="공"
          />
        </ResultBall>
      )}
      {showResultComponent && (
        <DrawResult selected={EVENT_FIELD_LIST[selectedIndex]} />
      )}
      <>
        <PrevButton onClick={() => navigate(-1)}>
          <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
        </PrevButton>
        <WrapExitHeader>
          <ExitHeader
            navigateTo="/community"
            userType={'dong'}
            backgroundColor="#f0e0c9"
            content=""
          />
        </WrapExitHeader>
        <WrapContent>
          <WrapImage>
            <Shadow />
            {/* <MachineImg src="/assets/event/drawMachine.png" alt="뽑기 기계" /> */}
            <WrapLottie>
              <Lottie
                animationData={drawAnimation}
                play={isPlaying} // 재생 상태에 따라 동작
                style={{ width: 300, height: 500 }}
                loop={false}
                onComplete={handleCompleteAnimation}
              />
            </WrapLottie>
          </WrapImage>
          <StyledButton children="노하우 뽑기" onClick={handleDrawButton} />
        </WrapContent>
      </>
    </>
  );
};

const ResultBall = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  img {
    width: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const WrapExitHeader = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.3rem;
  z-index: 99;
`;
const PrevButton = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.3rem;
  z-index: 99;

  img {
    width: 0.8rem;
  }
`;

const WrapContent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0e0c9;
  padding: 1.3rem 1.1rem;

  display: flex;
  flex-direction: column;
`;

const WrapImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Shadow = styled.div`
  width: 100%;
  height: 8.0625rem;
  border-radius: 50%;
  background-color: #ead2b4;
  position: absolute;
  bottom: -1rem;
  z-index: 0;
`;

const WrapLottie = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  position: relative;
  z-index: 9;
  margin-top: 4rem;
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

  margin: 2rem auto 0 auto;

  background-color: var(--Primary-dong);
`;

export default DrawPage;
