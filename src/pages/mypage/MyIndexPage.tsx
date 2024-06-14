import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import MyIndexPageDong from './MyIndexPageDong';
import MyIndexPageNari from './MyIndexPageNari';

const MyIndexPage: React.FC = () => {
  const { userType } = useOutletContext<{ userType: 'dong' | 'nari' }>();
  return (
    <WrapContent>
      {userType === 'dong' ? <MyIndexPageDong /> : <MyIndexPageNari />}
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default MyIndexPage;
