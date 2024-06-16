import React from 'react';
import styled from 'styled-components';

// 버튼 텍스트
//navigateTo optional 수정 필요
interface ButtonProps {
  shortcutButtonText: string;
  type: 'dong' | 'nari';
  navigateTo?: () => void;
}

const ShortcutButton = ({
  shortcutButtonText,
  type,
  navigateTo,
}: ButtonProps) => {
  let iconSrc;

  switch (shortcutButtonText) {
    case `구인글\n작성하기`:
      iconSrc = `/assets/home/home-write-nari.svg`;
      break;
    case `구인글\n조회하기`:
      iconSrc = `/assets/home/home-search-dong.svg`;
      break;
    case `리뷰\n작성하기`:
      switch (type) {
        case 'dong':
          iconSrc = `assets/home/home-review-${type}.svg`;
          break;
        case 'nari':
          iconSrc = `assets/home/home-review-${type}.svg`;
          break;
      }
      break;
  }
  return (
    <WrapButton onClick={navigateTo}>
      <ButtonText>{shortcutButtonText}</ButtonText>
      <WriteIcon
        //리뷰 작성하기, 구인글 조회하기, 구인글 작성하기
        src={iconSrc}
      ></WriteIcon>
    </WrapButton>
  );
};

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  border-radius: 0.6875rem;
  background: var(--Base-White, #fff);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  gap: 1rem;
`;

const ButtonText = styled.div`
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: pre;
`;

const WriteIcon = styled.img`
  margin-top: 0.8rem;
  width: 1.5625rem;
  height: 1.5625rem;
  flex-shrink: 0;
  margin-left: auto;
`;

export default ShortcutButton;
