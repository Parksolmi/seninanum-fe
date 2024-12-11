import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../components/common/Modal';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import useModal from '../../hooks/useModal';
import { instance } from '../../api/instance';

const ManageAccountPage = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();
  const [tel, setTel] = useState('');

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

  const { openModal: openDropoutModal, closeModal: closeDropoutModal } =
    useModal((id) => (
      <Modal
        userType={user?.userType || ''}
        title={'정말 탈퇴하시겠습니까?'}
        content={'전화번호를 입력해주세요.'}
        hasInput={true}
        onChange={(e) => setTel(e.target.value)}
        cancelText={'취소'}
        confirmText={'탈퇴하기'}
        onConfirm={() => handleDropout()}
        onCancel={closeDropoutModal}
      />
    ));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDropout = async () => {
    const sanitizedTel = tel.replace(/[^0-9]/g, ''); // 숫자만 추출
    //console.log('전화번호:', sanitizedTel);
    try {
      await instance.post('/dropout', { sanitizedTel });
      navigate('/');
    } catch (error) {
      console.error('회원 탈퇴에 실패했습니다.', error);
    }
  };

  return (
    <>
      <PrevHeader title={'계정관리'} navigateTo={'/mypage'} isLine={true} />
      <WrapMenu>
        <div onClick={openLogoutModal}>로그아웃</div>
        <div onClick={openDropoutModal}>회원탈퇴</div>
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
