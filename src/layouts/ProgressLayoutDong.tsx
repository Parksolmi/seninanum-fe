import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import { useFetchCareerProfile } from '../hooks/useCareerProfile';
import {
  CareerProfile,
  initialCareerProfile,
} from '../interface/careerProfileInterface';

const ProgressLayoutDong: React.FC = React.memo(() => {
  const location = useLocation();
  const contentAreaRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState(1);
  const [careerProfile, setCareerProfile] = useState<CareerProfile>({
    ...initialCareerProfile,
  });

  const { data } = useFetchCareerProfile();

  useEffect(() => {
    if (data) {
      setCareerProfile(data);
    }
  }, [data]);

  // 페이지가 변경될 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <Container>
        <WrapHeader>
          <ExitBtn>
            <ExitHeader userType={'dong'} navigateTo={'/home'} />
          </ExitBtn>
          <ProgressBar status={status} type={'dong'} />
        </WrapHeader>

        <ContentArea ref={contentAreaRef}>
          <Outlet
            context={{
              setStatus,
              careerProfile,
              setCareerProfile,
            }}
          />
        </ContentArea>
      </Container>
    </>
  );
});

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

export default ProgressLayoutDong;
