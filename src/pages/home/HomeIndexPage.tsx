import React from 'react';
import styled from 'styled-components';
import CareerProfileProgress from '../../components/home/CareerProfileProgress';

const HomeIndexPage: React.FC = () => {
  return (
    <WrapContent>
      <CareerProfileProgress status={2} />
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

export default HomeIndexPage;
