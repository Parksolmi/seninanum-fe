import React from 'react';
import styled from 'styled-components';
import ProgressBar from '../../components/common/ProgressBar';
import { Outlet } from 'react-router-dom';
import ExitHeader from '../../components/header/ExitHeader';
import progressStore from '../../store/CareerProgressState';

const CareerIndexPage = () => {
  const { status, setStatus } = progressStore();
  const incrementStatus = (status) => {
    setStatus(status);
  };

  const decrementStatus = (status) => {
    setStatus(status);
  };
  return (
    <Container>
      <ExitBtn>
        <ExitHeader userType="dong" navigateTo={'/home'} />
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
