import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import progressStore from '../store/careerProgressState';
import { instance } from '../api/instance';
import userTypeStore from '../store/userState';
import useCareerProfileState from '../store/careerProfileState';
import useCareerItemState from '../store/careerItemState';
import useRecruitState from '../store/recruitState';

const ProgressLayout: React.FC = () => {
  const { status, setStatus } = progressStore();
  const { userType } = userTypeStore();
  const { setCareerProfileState } = useCareerProfileState();
  const { setCareers } = useCareerItemState();
  const { recruitId } = useParams<{ recruitId: string }>();
  const { setRecruitState } = useRecruitState();
  const location = useLocation();
  const [exitPath, setExitPath] = useState('/home'); // 기본 경로를 /home으로 설정

  useEffect(() => {
    if (location.pathname.includes(`/modify/recruit`)) {
      setExitPath(`/manage/myrecruit`); // 특정 경로에 따라 나가기 경로 변경
    } else {
      setExitPath('/home'); // 기본 경로로 설정
    }
  }, [location, recruitId]);
  useEffect(() => {
    const fetchProfileProgress = async () => {
      try {
        const response = await instance.get(`/career`);
        setCareerProfileState(response.data.careerProfile);
        setCareers(response.data.careerItems);
      } catch (error) {
        console.error('경력 프로필 조회에 실패하였습니다.', error);
      }
    };
    if (userType === 'dong') {
      fetchProfileProgress();
    }
  }, [userType, setCareerProfileState, setCareers]);

  useEffect(() => {
    if (recruitId) {
      // recruitId가 있을 경우 기존 데이터를 불러오기 (수정 모드)
      const fetchRecruit = async () => {
        try {
          const response = await instance.get(`/recruit/mylist/${recruitId}`);
          setRecruitState(response.data);
        } catch (error) {
          console.error('구인글 불러오기 실패:', error);
        }
      };
      fetchRecruit();
    }
  }, [recruitId, setRecruitState]);
  return (
    <>
      <Container>
        <WrapHeader>
          <ExitBtn>
            <ExitHeader userType={userType} navigateTo={exitPath} />
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
