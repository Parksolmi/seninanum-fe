import styled from 'styled-components';
import React from 'react';

interface NotFoundDongProps {
  title: string;
  content: React.ReactNode;
}

const NotFoundNari = ({ title, content }: NotFoundDongProps) => {
  return (
    <WrapContent>
      <img src="/assets/character/nari-notfound.png" alt="not found" />
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;

  img {
    width: 11rem;
  }

  h1 {
    color: var(--Base-Black, #000);
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  p {
    color: #393939;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4375rem; /* 127.778% */
    letter-spacing: 0.07875rem;
    margin-top: 1rem;
  }
`;

export default NotFoundNari;
