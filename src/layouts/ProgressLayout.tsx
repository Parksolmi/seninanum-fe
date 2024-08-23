import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import progressStore from '../store/CareerProgressState';

const ProgressLayout: React.FC = () => {
  const { status, setStatus } = progressStore();

  return (
    <>
      <Container>
        <ExitBtn>
          <ExitHeader userType="dong" navigateTo={'/home'} />
        </ExitBtn>
        <ProgressBar status={status} type="dong" />
        <Outlet context={setStatus} />
      </Container>
    </>
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
export default ProgressLayout;
