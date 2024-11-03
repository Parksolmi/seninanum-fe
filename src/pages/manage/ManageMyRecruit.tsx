import React, { useCallback, useEffect, useState } from 'react';
import PrevHeader from '../../components/header/PrevHeader';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';
import ManageCard from '../../components/mypage/ManageCard';
import FloatingButton from '../../components/common/FloatingButton';

interface Recruit {
  recruitId: number;
  title: string;
  content: string;
  method: string;
  region: string;
  field: string;
  applicantCount: number;
}

const ManageMyRecruit = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1); //1.모집중, 2.마감
  const [recruitList, setRecruitList] = useState<Recruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 모달 창
  const {
    openModal: openRecruitDeleteModal,
    closeModal: closeRecruitDeleteModal,
  } = useModal((id) => (
    <Modal
      userType={'nari'}
      title={'정말 삭제하시겠습니까?'}
      content={``}
      cancelText={'취소'}
      confirmText={'삭제하기'}
      onConfirm={() => handleDelete(id)}
      onCancel={closeRecruitDeleteModal}
    />
  ));

  const { openModal: openErrorModal, closeModal: closeErrorModal } = useModal(
    () => (
      <Modal
        userType={'nari'}
        title={'구인글 삭제 실패'}
        content={`지원자가 있는 경우\n구인글을 삭제할 수 없습니다.`}
        cancelText={''}
        confirmText={'확인'}
        onConfirm={closeErrorModal}
      />
    )
  );

  // 상태 별 API 호출 함수(useCallback으로 메모이제이션)
  // useEffect(() => {
  //   const fetchRecruitList = async () => {
  //     try {
  //       const res = await instance.get('/recruit/mylist');
  //       setRecruitList(res.data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRecruitList();
  // }, []);

  const fetchRecruitList = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await instance.get('/recruit/mylist', {
        params: { status }, // 쿼리 파라미터로 상태 전달
      });
      setRecruitList(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 탭이 변경될 때마다 해당 상태의 데이터를 가져옴
  useEffect(() => {
    const status = activeTab === 1 ? '모집중' : '마감';
    fetchRecruitList(status);
  }, [activeTab, fetchRecruitList]); // activeTab 변경 시 API 호출

  // 구인글 삭제
  const handleDelete = async (recruitId) => {
    try {
      await instance.delete(`/recruit/${recruitId}`);
      alert('구인글이 삭제되었습니다.');
      setRecruitList((prev) =>
        prev.filter((recruit) => recruit.recruitId !== recruitId)
      );
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // 400 응답일 경우, 지원자 존재로 인한 삭제 불가 메시지 모달 표시
        openErrorModal();
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PrevHeader title={'구인글 관리'} navigateTo={'/mypage'} />
      <WrapContent>
        <Tab>
          <p
            onClick={() => setActiveTab(1)}
            className={activeTab === 1 ? 'active' : ''}
          >
            모집공고
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
          ) : recruitList.length === 0 ? (
            <p>
              {activeTab === 1
                ? '모집 중인 구인글이 없습니다.'
                : '마감된 구인글이 없습니다.'}
            </p>
          ) : (
            recruitList.map((recruit) => (
              <ManageCard
                key={recruit.recruitId}
                type="dong"
                title={recruit.title}
                content={recruit.content}
                method={recruit.method}
                region={recruit.region ? recruit.region : ''}
                navigateTo={() =>
                  navigate(`/view/myrecruit/${recruit.recruitId}`)
                }
                applicantCount={recruit.applicantCount}
                onDelete={() => openRecruitDeleteModal(recruit.recruitId)}
              />
            ))
          )}
        </WrapContentSingle>
      </WrapContent>
      <FloatingButton
        userType={'nari'}
        onClick={() => navigate('/register/recruit/field')}
      />
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
      color: #ffaa0e;
      font-family: NanumSquare;
      font-weight: 700;
    }

    &.active::after {
      content: '';
      display: block;
      width: 7.625rem;
      height: 0.25rem;
      background-color: #ffd111;
      position: absolute;
      bottom: -0.6rem;
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

export default ManageMyRecruit;
