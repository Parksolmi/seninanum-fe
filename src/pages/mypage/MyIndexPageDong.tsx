import React from 'react';
import styled from 'styled-components';
import BasicProfile from '../../components/mypage/BasicProfile';
import GroupMenu from '../../components/mypage/GroupMenu';
import PayMenu from '../../components/mypage/PayMenu';

const MyIndexPageDong: React.FC = () => {
  return (
    <>
      <WrapProfile>
        <BasicProfile userType="dong" navigateTo={'/view/myprofile/dong'} />
      </WrapProfile>
      <WrapMenu>
        <PayMenu userType="dong" />
        <GroupMenu />
      </WrapMenu>
    </>
  );
};

const WrapProfile = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 4rem;
`;
const WrapMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-bottom: 2rem;
`;

export default MyIndexPageDong;
