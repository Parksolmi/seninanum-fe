import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import progressStore from '../store/careerProgressState';
import { instance } from '../api/instance';
import useRecruitState from '../store/recruitState';

const ProgressLayoutNari: React.FC = () => {
  const { status, setStatus } = progressStore();
  const { recruitId } = useParams<{ recruitId: string }>();
  const { setRecruitState } = useRecruitState();

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
            <ExitHeader
              userType={'nari'}
              navigateTo={recruitId ? '/manage/myrecruit' : '/home'}
            />
          </ExitBtn>
          <ProgressBar status={status} type={'nari'} />
        </WrapHeader>

        <ContentArea>
          <Outlet
            context={{
              setStatus,
            }}
          />
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

export default ProgressLayoutNari;
