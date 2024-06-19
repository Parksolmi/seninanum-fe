import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaneerButton from '../../components/chat/BannerButton';
import MessageBox from '../../components/chat/MessageBox';
import MessageInput from '../../components/chat/MessageInput';

const ChatPageNari = () => {
  const navigate = useNavigate();

  //임시
  const [visible, setVisible] = useState(false);

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
      <WrapBanner>
        <BaneerButton src={'/assets/chat/won-icon.png'} text="송금요청" />
        <BaneerButton src={'/assets/chat/calendar-icon.png'} text="약속잡기" />
      </WrapBanner>
      <WrapChat>
        <div className="date">6월 19일 수요일</div>
        <MessageBox type="nari" visible={visible} />
      </WrapChat>

      <MessageInput setVisible={() => setVisible(true)} />
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

const WrapBanner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 1.5rem;
  box-shadow: 0px 2px 3px rgba(150, 150, 150, 0.4);
  padding: 0 1.1rem 1rem 1.1rem;
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
