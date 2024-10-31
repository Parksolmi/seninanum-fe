import React from 'react';
import FloatingButton from '../../components/common/FloatingButton';
import FreeBoardCard from '../../components/community/FreeBoardCard';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';

const FreeCommunityPage = () => {
  const { data: user } = useFetchUserType();

  return (
    <>
      <PrevHeader
        title={'자유게시판'}
        navigateTo={'/community'}
        isLine={true}
      />
      <FreeBoardCard />
      <FloatingButton userType={user?.userType} />
    </>
  );
};
export default FreeCommunityPage;
