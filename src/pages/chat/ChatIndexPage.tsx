import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ChatIndexPageNari from './ChatIndexPageNari';
import ChatIndexPageDong from './ChatIndexPageDong';
import styled from 'styled-components';

const ChatIndexPage: React.FC = () => {
  const { userType } = useOutletContext<{ userType: 'dong' | 'nari' }>();
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
