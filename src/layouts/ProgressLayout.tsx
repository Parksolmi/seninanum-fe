import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import progressStore from '../store/careerProgressState';
import { instance } from '../api/instance';
import userTypeStore from '../store/userState';
import useCareerProfileState from '../store/careerProfileState';

const ProgressLayout: React.FC = () => {
  const { pathname } = useLocation();

  const { status, setStatus } = progressStore();
  const { userType } = userTypeStore();
  const { careerProfileState, setCareerProfileState, calculateProgress } =
    useCareerProfileState();

  const [previousProfileId, setPreviousProfileId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const profileId = pathname.split('/').pop() ?? null;
    // 이전 profileId와 다를 때만 api 호출
    if (profileId !== previousProfileId) {
      const fetchProfileProgress = async () => {
        try {
          const response = await instance.get(`/career/${profileId}`);
          setCareerProfileState(response.data);
          setPreviousProfileId(profileId);
        } catch (error) {
          console.error('경력 프로필 조회에 실패하였습니다.', error);
        }
      };

      fetchProfileProgress();
    }
  }, [pathname, previousProfileId, setCareerProfileState]);

  return (
    <>
      <Container>
        <ExitBtn>
          <ExitHeader userType={userType} navigateTo={'/home'} />
        </ExitBtn>
        <ProgressBar status={status} type={userType} />

        {userType === 'dong' ? (
          <Outlet
            context={{
              setStatus,
              careerProfileState,
              setCareerProfileState,
              calculateProgress,
            }}
          />
        ) : (
          <Outlet
            context={{
              setStatus,
            }}
          />
        )}
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
