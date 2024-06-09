import React from 'react';
import styled from 'styled-components';

// 버튼 텍스트
interface ButtonProps {
  shortcutButtonText: string;
}

const ShortcutButton = ({ shortcutButtonText }: ButtonProps) => {
  return (
    <WrapButton>
      <ButtonText>{shortcutButtonText}</ButtonText>
      <WriteIcon
        //리뷰 작성하기, 구인글 조회하기, 구인글 작성하기
        src={
          shortcutButtonText !== `구인글\n작성하기`
            ? shortcutButtonText === `리뷰\n작성하기`
              ? process.env.PUBLIC_URL + '/assets/common/review-nari.svg'
              : process.env.PUBLIC_URL + '/assets/common/write-nari.svg'
            : process.env.PUBLIC_URL + '/assets/common/write-nari.svg'
        }
      ></WriteIcon>
    </WrapButton>
  );
};

const WrapButton = styled.div`
  display: flexbox;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-radius: 0.6875rem;
  background: var(--Base-White, #fff);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  padding: 0.6rem;
`;

const ButtonText = styled.div`
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const WriteIcon = styled.img`
  margin-top: 0.8rem;
  width: 1.5625rem;
  height: 1.5625rem;
  flex-shrink: 0;
  position: relative;
  left: 90%;
`;

export default ShortcutButton;
