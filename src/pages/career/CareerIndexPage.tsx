import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../../components/common/ProgressBar';
import { Outlet } from 'react-router-dom';
import ExitHeader from '../../components/header/ExitHeader';

const CareerIndexPage = () => {
  const [status, setStatus] = useState(1);
  const incrementStatus = () => {
    setStatus((prev) => Math.min(prev + 1, 3));
  };

  const decrementStatus = () => {
    setStatus((prev) => Math.max(prev - 1, 1));
  };
  return (
    <Container>
      <ExitBtn>
        <ExitHeader navigateTo={'/home'} />
      </ExitBtn>
      <ProgressBar status={status} type="dong" />
      <Outlet context={{ incrementStatus, decrementStatus }} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
`;

const ExitBtn = styled.div`
  float: right;
`;

export default CareerIndexPage;
