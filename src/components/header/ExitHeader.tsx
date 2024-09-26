import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import Modal from '../../components/common/Modal';

const ExitHeader = ({ navigateTo, userType }) => {
  const navigate = useNavigate();

  // 모달 열고 닫기
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const cancelModal = () => setIsOpenModal(false);
  const confirmModal = () => {
    navigate(navigateTo);
  };

  return (
    <>
      {/* <Modal
        userType={userType}
        isOpen={isModalOpen}
        title={'정말 나가시겠습니까?'}
        content={`지금 나가면 \n작성했던 모든 내용이 사라져요.`}
        cancelText={'취소'}
        confirmText={'나가기'}
        confirmModal={confirmModal}
        cancelModal={cancelModal}
      /> */}

      <ButtonWrap onClick={openModal}>
        <StopWritingButton />
      </ButtonWrap>
    </>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  float: right;
  width: 5.7rem;
  height: 2.2rem;
  flex-shrink: 0;
  margin-bottom: 1.63rem;
`;

export default ExitHeader;
