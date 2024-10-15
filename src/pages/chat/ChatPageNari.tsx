import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ChatPageNari = () => {
  const navigate = useNavigate();

  return (
    <>
      <WrapHeader>
        <BackButton onClick={() => navigate('/home')}>
          <img src={'/assets/signIn/back-icon.svg'} alt="뒤로가기" />
        </BackButton>
        <TitleText>동백</TitleText>
        <img src={'/assets/chat/exit-icon.svg'} alt="나가기" />
      </WrapHeader>
      <Split />
      {/* <WrapBanner>
        <BaneerButton src={'/assets/chat/won-icon.png'} text="송금요청" />
        <BaneerButton src={'/assets/chat/calendar-icon.png'} text="약속잡기" />
      </WrapBanner> */}
      <WrapChat>
        <div className="date">6월 19일 수요일</div>
        {/* <MessageBox type="nari" visible={visible} /> */}
      </WrapChat>

      {/* <MessageInput setVisible={() => setVisible(true)} /> */}
    </>
  );
};

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.8rem 1.1rem 1.1rem 1.1rem;
`;

const Split = styled.div`
  border-top: solid 1px #ebeceb;
  padding: 0.7rem 0;
`;

const BackButton = styled.div`
  img {
    width: 1.5rem;
  }
`;

const TitleText = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.075rem;
  white-space: nowrap;
`;

const WrapChat = styled.div`
  .date {
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 400;
    padding: 1.5rem 0 0 0;
  }
`;

export default ChatPageNari;
