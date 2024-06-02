import React from 'react';
import styled from 'styled-components';
import ApplyMyRecruit from '../../components/home/MyRecruitProgress';
import ShortcutButton from '../../components/common/ShortcutButton';
import RecommendDongCard from '../../components/home/ProfileVerticalCard';
import RecommendDongCardDetail from '../../components/home/ProfileHorizontalCard';
import CareerDetail from '../../components/common/CareerDetail';

const HomeIndexPage: React.FC = () => {
  const handleDelete = () => {
    console.log('삭제');
  };

  return (
    <WrapContent>
      <CareerDetail
        title="IT분야 HR본부 인재관리"
        period="1993.03 ~ 2023.10"
        content="세부 업무 내용입니다."
        onDelete={handleDelete}
      />
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
