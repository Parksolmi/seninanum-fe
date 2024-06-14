import React from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import HomeIndexPageDong from './HomeIndexPageDong';
import HomeIndexPageNari from './HomeIndexPageNari';

const HomeIndexPage: React.FC = () => {
  const { userType } = useOutletContext<{ userType: 'dong' | 'nari' }>();
  return (
    <WrapContent>
      {userType === 'dong' ? <HomeIndexPageDong /> : <HomeIndexPageNari />}
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

export default HomeIndexPage;
