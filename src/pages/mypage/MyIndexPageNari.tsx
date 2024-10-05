import React, { useEffect } from 'react';
import styled from 'styled-components';
import BasicProfile from '../../components/mypage/BasicProfile';
import GroupMenu from '../../components/mypage/GroupMenu';
import PayMenu from '../../components/mypage/PayMenu';

interface User {
  nickname: string;
  gender: string;
  birthYear: string;
  profile: string;
}

interface UserProps {
  userState: User | undefined;
}

const MyIndexPageNari: React.FC<UserProps> = ({ userState }) => {
  // user가 변경될 때마다 로그 출력
  useEffect(() => {
    console.log(userState);
  }, [userState]); // user 상태가 업데이트될 때마다 실행

  return (
    <>
      <WrapProfile>
        <BasicProfile
          userType="nari"
          navigateTo={'/view/myprofile/nari'}
          userState={userState}
        />
      </WrapProfile>
      <WrapMenu>
        <PayMenu userType="nari" />
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

export default MyIndexPageNari;
