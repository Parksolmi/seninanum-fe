import React from 'react';
import styled from 'styled-components';
import TitleHeader from '../../components/header/TitleHeader';
import { useFetchMyProfile } from '../../hooks/useFetchProfile';
import BasicProfile from '../../components/mypage/BasicProfile';
import PayMenu from '../../components/mypage/PayMenu';
import GroupMenu from '../../components/mypage/GroupMenu';
import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  userType: string;
  career: number;
}

const MyIndexPage: React.FC = () => {
  const { userType } = useOutletContext<OutletContext>();
  const { data: user } = useFetchMyProfile();

  return (
    <>
      <TitleHeader title="내 정보" isShowAlert={true} />
      <WrapContent>
        <WrapProfile>
          <BasicProfile
            userType={userType}
            navigateTo={`/view/myprofile/${userType}`}
            userState={user}
          />
        </WrapProfile>
        <WrapMenu>
          <PayMenu userType={userType} />
          <GroupMenu userType={userType} />
        </WrapMenu>
      </WrapContent>
    </>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

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

export default MyIndexPage;
