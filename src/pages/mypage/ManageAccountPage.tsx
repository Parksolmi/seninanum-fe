import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../components/common/Modal';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import useModal from '../../hooks/useModal';

const ManageAccountPage = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();

  //모달창
  const { openModal: openLogoutModal, closeModal: closeLogoutModal } = useModal(
    (id) => (
      <Modal
        userType={user?.userType || ''}
        title={'로그아웃 하시겠습니까?'}
        content={''}
        cancelText={'취소'}
        confirmText={'로그아웃'}
        onConfirm={() => handleLogout()}
        onCancel={closeLogoutModal}
      />
    )
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <PrevHeader title={'계정관리'} navigateTo={'/mypage'} isLine={true} />
      <WrapMenu>
        <div onClick={openLogoutModal}>로그아웃</div>
        <div>회원탈퇴</div>
      </WrapMenu>
    </>
  );
};

const WrapMenu = styled.div`
  padding: 0.5rem 0 0 1.3rem;

  div {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.0375rem;
    border-bottom: 1px solid #ebeceb;

    padding: 1.3rem 0;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export default ManageAccountPage;
