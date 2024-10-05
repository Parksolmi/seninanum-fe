import React from 'react';
import styled from 'styled-components';
import MyIndexPageDong from './MyIndexPageDong';
import MyIndexPageNari from './MyIndexPageNari';
import userTypeStore from '../../store/userState';
import TitleHeader from '../../components/header/TitleHeader';
import { useFetchProfile } from '../../hooks/useFetchProfile';

const MyIndexPage: React.FC = () => {
  const { userType } = userTypeStore();
  const { data: user } = useFetchProfile();

  return (
    <>
      <TitleHeader title="내 정보" isShowAlert={true} />
      <WrapContent>
        {userType === 'dong' ? (
          <MyIndexPageDong userState={user} />
        ) : (
          <MyIndexPageNari userState={user} />
        )}
      </WrapContent>
    </>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default MyIndexPage;
