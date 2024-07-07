import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
interface ProgressContextType {
  incrementStatus: () => void;
  decrementStatus: () => void;
}

const ProgressLayout: React.FC = () => {
  const { incrementStatus, decrementStatus } =
    useOutletContext<ProgressContextType>();
  return (
    <>
      <Container>
        <Outlet context={{ incrementStatus, decrementStatus }} />
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ProgressLayout;
