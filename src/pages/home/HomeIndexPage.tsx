import React from 'react';
import styled from 'styled-components';
import CareerDetail from '../../components/common/CareerDetail';
import Category from '../../components/common/Category';
import ageState from '../../constants/ageState';

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
      <Category
        label={ageState.label}
        list={ageState.list}
        onDelete={handleDelete}
      />
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

export default HomeIndexPage;
