import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import progressStore from '../store/careerProgressState';
import { instance } from '../api/instance';
import userTypeStore from '../store/userState';
import useCareerProfileState from '../store/careerProfileState';

const ProgressLayout: React.FC = () => {
  // const { pathname } = useLocation();

  const { status, setStatus } = progressStore();
  const { userType } = userTypeStore();
  const { setCareerProfileState } = useCareerProfileState();

  useEffect(() => {
    const fetchProfileProgress = async () => {
      try {
        const response = await instance.get(`/career`);
        setCareerProfileState(response.data);
      } catch (error) {
        console.error('경력 프로필 조회에 실패하였습니다.', error);
      }
    };
    if (userType === 'dong') {
      fetchProfileProgress();
    }
  }, [userType, setCareerProfileState]);

  return (
    <>
      <Container>
        <WrapHeader>
          <ExitBtn>
            <ExitHeader userType={userType} navigateTo={'/home'} />
          </ExitBtn>
          <ProgressBar status={status} type={userType} />
        </WrapHeader>

        <ContentArea>
          {userType === 'dong' ? (
            <Outlet
              context={{
                setStatus,
              }}
            />
          ) : (
            <Outlet
              context={{
                setStatus,
              }}
            />
          )}
        </ContentArea>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* padding: 1.3rem 1.1rem; */
`;

const WrapHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 9;
  padding: 1.3rem 1.1rem 0 1.1rem;
`;

const ExitBtn = styled.div`
  float: right;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export default ProgressLayout;
