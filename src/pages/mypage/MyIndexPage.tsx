import React from 'react';
import styled from 'styled-components';
import MyIndexPageDong from './MyIndexPageDong';
import MyIndexPageNari from './MyIndexPageNari';
import userTypeStore from '../../store/userTypeState';

const MyIndexPage: React.FC = () => {
  const { userType } = userTypeStore();

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
