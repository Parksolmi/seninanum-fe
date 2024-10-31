import React from 'react';
// import styled from 'styled-components';
import FloatingButton from '../../components/common/FloatingButton';
import AdviceBoardCard from '../../components/community/AdviceBoardCard';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';

const AdviceCommunityPage = () => {
  const { data: user } = useFetchUserType();

  return (
    <>
      <PrevHeader title={'고민상담'} navigateTo={'/community'} isLine={true} />
      <AdviceBoardCard userType={user?.userType} />
      <FloatingButton userType={user?.userType} />
    </>
  );
};
export default AdviceCommunityPage;
