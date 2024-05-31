import React from 'react';
import styled from 'styled-components';

const ShortcutButton: React.FC = () => {
  return (
    <WrapButton>
      <ButtonText>구인글 작성하기</ButtonText>
      <WriteIcon
        src={process.env.PUBLIC_URL + '/assets/common/write-nari.svg'}
      ></WriteIcon>
    </WrapButton>
  );
};

const WrapButton = styled.div`
  display: flexbox;
  flex-direction: column;
  width: 100%;
  height: 5.875rem;
  border-radius: 0.6875rem;
  background: var(--Base-White, #fff);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
`;

const ButtonText = styled.div`
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.8rem 0.9rem 0rem 0.4rem;
`;

const WriteIcon = styled.img`
  margin-top: 0.8rem;
  margin-left: 0.7rem;
  width: 1.5625rem;
  height: 1.5625rem;
  flex-shrink: 0;
`;

export default ShortcutButton;
