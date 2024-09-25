import React from 'react';
import ChatIndexPageNari from './ChatIndexPageNari';
import ChatIndexPageDong from './ChatIndexPageDong';
import styled from 'styled-components';
import userTypeStore from '../../store/userState';

const ChatIndexPage: React.FC = () => {
  const { userType } = userTypeStore();

  return (
    <WrapContent>
      {userType === 'dong' ? <ChatIndexPageDong /> : <ChatIndexPageNari />}
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default ChatIndexPage;
