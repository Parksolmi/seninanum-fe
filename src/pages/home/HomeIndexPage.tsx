import React from 'react';
import styled from 'styled-components';
import ApplyMyRecruit from '../../components/home/MyRecruitProgress';
import ShortcutButton from '../../components/common/ShortcutButton';
import RecommendDongCard from '../../components/home/ProfileVerticalCard';
import RecommendDongCardDetail from '../../components/home/ProfileHorizontalCard';

const HomeIndexPage: React.FC = () => {
  return (
    <WrapContent>
      <h1>홈페이지</h1>
      <ApplyMyRecruit
        profileImage={process.env.PUBLIC_URL + '/assets/common/profile.png'}
        applicantCount={3}
      />
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
