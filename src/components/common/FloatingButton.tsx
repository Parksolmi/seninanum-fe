import React from 'react';
import styled from 'styled-components';

const FloatingButton = ({ userType }) => {
  return (
    <WrapViewPort>
      <Button $userType={userType}>
        글쓰기
        <img src={`/assets/community/pencil_${userType}.png`} alt="write" />
      </Button>
    </WrapViewPort>
  );
};

const WrapViewPort = styled.div`
  position: fixed;
  bottom: 2rem; /* 화면 아래에서의 거리 */
  right: 1.5rem; /* 화면 오른쪽에서의 거리 */
  z-index: 1000; /* 다른 요소 위에 나타나도록 설정 */
`;

interface ButtonProp {
  $userType: 'dong' | 'nari';
}
const Button = styled.button<ButtonProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s;

  border-radius: 12.5rem;

  border: ${({ $userType }) =>
    $userType === 'dong'
      ? '2px solid var(--Dong-main, #FF314A)'
      : '2px solid var(--Primary-nari, #ffaa0e)'};
  background: var(--White, #fff);

  padding: 0.8rem 1rem;

  color: ${({ $userType }) =>
    $userType === 'dong'
      ? 'var(--Dong-main, #FF314A)'
      : 'var(--Nari-2, var(--Primary-nari, #ffaa0e))'};
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  img {
    width: 1.1rem;
    margin-left: 0.5rem;
  }
`;

export default FloatingButton;
