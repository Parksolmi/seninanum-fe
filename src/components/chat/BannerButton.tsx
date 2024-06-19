import React from 'react';
import { styled } from 'styled-components';

interface BannerButton {
  src: string;
  text: string;
}
const BaneerButton = ({ src, text }: BannerButton) => {
  return (
    <WrapButtom>
      <img src={src} alt="배너버튼" />
      <p>{text}</p>
    </WrapButtom>
  );
};

const WrapButtom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;

  padding: 0.7rem 0;
  border-radius: 0.4375rem;
  border: 2px solid var(--Base-Gray, #8e8e8e);
  background: var(--Base-White, #fff);

  img {
    width: 1.5rem;
  }
  p {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 700;
    padding-top: 0.2rem;
  }
`;

export default BaneerButton;
