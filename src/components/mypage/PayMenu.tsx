import React from 'react';
import styled from 'styled-components';

interface PayMenuProps {
  userType: string;
}

const PayMenu: React.FC<PayMenuProps> = ({ userType }) => {
  return (
    <WrapPayMenu $userType={userType}>
      <WrapCharacter>
        <img src={`/assets/character/${userType}-pay.png`} alt="character" />
      </WrapCharacter>
      <h3>시니포인트</h3>
      <div className="point">
        <div>10,000원</div>
        <div className="buttons">
          <PayButton>내역</PayButton>
          {userType === 'nari' && <PayButton>충전</PayButton>}
        </div>
      </div>
    </WrapPayMenu>
  );
};

interface WrapPayMenuProps {
  $userType: string;
}
const WrapPayMenu = styled.div<WrapPayMenuProps>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  border-radius: 1.25rem;
  background: ${({ $userType }) =>
    $userType === 'dong' ? '#ff314a' : '#FFEBB2'};
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  padding: 1.5rem 1rem 1rem 1rem;

  position: relative;

  color: ${({ $userType }) => ($userType === 'dong' ? '#fff' : '#3B3939')};

  h3 {
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 800;
  }

  .point {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 500;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.7rem;
  }
`;

const WrapCharacter = styled.div`
  position: absolute;
  top: -5.5rem;
  right: 0;

  img {
    width: 6rem;
  }
`;

const PayButton = styled.div`
  border-radius: 4.5rem;
  background: var(--White, #fff);
  color: black;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
`;

export default PayMenu;
