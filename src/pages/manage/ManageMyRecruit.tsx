import React, { useEffect, useState } from 'react';
import PrevHeader from '../../components/header/PrevHeader';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import DetailCard from '../../components/common/DetailCard';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';

interface Recruit {
  recruitId: number;
  title: string;
  content: string;
  method: string;
  region: string;
  field: string;
}

const ManageMyRecruit = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);
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
  useEffect(() => {
    const fetchRecruitList = async () => {
      try {
        const res = await instance.get('/recruit/mylist');
        setRecruitList(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruitList();
  }, []);

  // 구인글 삭제
  const handleDelete = async (recruitId) => {
    try {
      await instance.delete(`/recruit/${recruitId}`);
      alert('구인글이 삭제되었습니다.');
      setRecruitList((prev) =>
        prev.filter((recruit) => recruit.recruitId !== recruitId)
      );
    } catch (err) {
      setError(err);
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
            모집 중
          </p>
          <p
            onClick={() => setActiveTab(2)}
            className={activeTab === 2 ? 'active' : ''}
          >
            마감
          </p>
        </Tab>
        <WrapContentSingle>
          {loading ? (
            <WrapLoader>
              <SyncLoader color="var(--Primary-nari)" />
            </WrapLoader>
          ) : error ? (
            <p>Error fetching recruit list.</p>
          ) : (
            recruitList.map((recruit) => (
              <DetailCard
                key={recruit.recruitId}
                type="dong"
                title={recruit.title}
                content={recruit.content}
                method={recruit.method}
                region={recruit.region ? recruit.region : ''}
                navigateTo={() =>
                  navigate(`/view/myrecruit/${recruit.recruitId}`)
                }
                isMyProfile={true}
                isEditable={true}
                onDelete={() => openRecruitDeleteModal(recruit.recruitId)}
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
  margin-top: 0.7rem;
  flex-direction: row;
  justify-content: center;
  gap: 5.2rem;
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
      background-color: #ffaa0e;
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
  margin-top: 2.8rem;
  margin-bottom: 2.5rem;
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
