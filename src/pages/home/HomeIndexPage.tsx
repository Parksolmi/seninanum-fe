import React, { useState } from 'react';
import styled from 'styled-components';
import ApplyMyRecruit from '../../components/home/ApplyMyRecruit';
import ShortcutButton from '../../components/common/ShortcutButton';
import RecommendDongCard from './RecommendDongCard';
import RecommendDongCardDetail from './RecommendDongCardDetail';

const HomeIndexPage: React.FC = () => {
  return (
    <WrapContent>
      <h1>홈페이지</h1>
      <ApplyMyRecruit />
      <ShortcutButton />
      <RecommendDongCard />
      <RecommendDongCardDetail />
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

export default HomeIndexPage;
