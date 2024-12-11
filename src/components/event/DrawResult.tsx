import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ResultCardBack from './ResultCardBack';
import { motion } from 'framer-motion';
import ResultCardFront from './ResultCardFront';

const DrawResult = ({ selected }) => {
  const navigate = useNavigate();

  const [flip, setFlip] = useState(true);
  const randomIndex = Math.floor(Math.random() * selected.content.length);
  const randomContent = selected.content[randomIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlip(false);
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <WrapContent>
        <motion.div
          style={{ width: '17rem', height: '23rem' }}
          transition={{ duration: 0.7 }}
          animate={{ rotateY: flip ? 0 : 180 }}
        >
          <motion.div
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
            className="Card"
          >
            <motion.div
              transition={{ duration: 0.7 }}
              animate={{ rotateY: flip ? 0 : 180 }}
              className="front"
            >
              <ResultCardFront color={selected.color} name={selected.name} />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: flip ? 180 : 0 }}
              // style={{ display: flip ? "none" : "block" }}
              transition={{ duration: 0.7 }}
              className="back"
            >
              <ResultCardBack
                color={selected.color}
                name={selected.name}
                nickname={selected.content[0].nickname}
                knowhow={randomContent.knowhow}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <p>
          부스 운영자에게 해당 사진을 보여주시면 <br />
          실물 출력 해드려요!
        </p>
        <StyledButton children="닫기" onClick={() => navigate('/community')} />
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0e0c9;
  padding: 1.3rem 1.1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;

  border-radius: 16px;

  position: relative;
  z-index: 9999;

  overflow: hidden;

  p {
    color: #000;
    text-align: center;
    font-family: 'NanumSquare';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .front,
  .back {
    backface-visibility: hidden; /* 카드 뒤쪽이 보이지 않도록 설정 */
    position: absolute;
    width: 100%;
    height: 100%;
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

  margin-top: 1rem;
  background-color: var(--Primary-dong);
`;

export default DrawResult;
