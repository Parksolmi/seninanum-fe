import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';
import { instance } from '../../api/instance';
import styled from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';
import PrevHeader from '../../components/header/PrevHeader';
import ApplicationCard from '../../components/mypage/ApplicationCard';

interface Application {
  applicationId: string;
  createdAt: string;
  recruitId: number;
  title: string;
  content: string;
  method: string;
  region: string;
}

const ManageMyApplication = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1); //1.지원공고, 2.마감공고
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 모달 창
  const { openModal: openCancelModal, closeModal: closeCancelModal } = useModal(
    (id) => (
      <Modal
        userType={'dong'}
        title={'정말 취소하시겠습니까?'}
        content={``}
        cancelText={'돌아가기'}
        confirmText={'취소하기'}
        onConfirm={() => handleCancel(id)}
        onCancel={closeCancelModal}
      />
    )
  );
  const fetchApplicationList = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await instance.get('/application/status', {
        params: { status }, // 쿼리 파라미터로 상태 전달
      });
      setApplicationList(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 탭이 변경될 때마다 해당 상태의 데이터를 가져옴
  useEffect(() => {
    const status = activeTab === 1 ? '모집중' : '마감';
    fetchApplicationList(status);
  }, [activeTab, fetchApplicationList]); // activeTab 변경 시 API 호출

  // 지원 취소하기
  const handleCancel = async (applicationId) => {
    try {
      await instance.delete(`/application`, {
        params: { applicationId }, // 쿼리 파라미터로 전달
      });
      alert('지원 취소되었습니다.');
      setApplicationList((prev) =>
        prev.filter((app) => app.applicationId !== applicationId)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <PrevHeader title={'지원 이력 조회'} navigateTo={'-1'} />
      <WrapContent>
        <Tab>
          <p
            onClick={() => setActiveTab(1)}
            className={activeTab === 1 ? 'active' : ''}
          >
            지원공고
          </p>
          <p
            onClick={() => setActiveTab(2)}
            className={activeTab === 2 ? 'active' : ''}
          >
            마감공고
          </p>
        </Tab>
        <WrapContentSingle>
          {loading ? (
            <WrapLoader>
              <SyncLoader color="var(--Primary-nari)" />
            </WrapLoader>
          ) : error ? (
            <p>Error fetching recruit list.</p>
          ) : applicationList.length === 0 ? (
            <p>
              {activeTab === 1
                ? '지원한 공고가 없습니다.'
                : '마감된 공고가 없습니다.'}
            </p>
          ) : (
            applicationList.map((application) => (
              <ApplicationCard
                key={application.applicationId}
                type="nari"
                title={application.title}
                method={application.method}
                region={application.region ? application.region : ''}
                navigateTo={() =>
                  navigate(`/view/recruit/${application.recruitId}`)
                }
                onCancel={() => openCancelModal(application.applicationId)}
              />
            ))
          )}
        </WrapContentSingle>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const Tab = styled.div`
  display: flex;
  margin-top: 0.5rem;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  p {
    color: #414040;
    text-align: center;
    font-size: 1.375rem;
    letter-spacing: 0.0275rem;
    font-family: NanumSquare;
    font-weight: 500;
    position: relative;
    &.active {
      color: #ff314a;
      font-family: NanumSquare;
      font-weight: 700;
    }

    &.active::after {
      content: '';
      display: block;
      width: 7.625rem;
      height: 0.25rem;
      background-color: #ff314a;
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.8rem;
  margin-bottom: 1.25rem;
`;

const WrapLoader = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ManageMyApplication;
