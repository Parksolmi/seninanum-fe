import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface ModalProps {
  userType;
  isOpen;
  title;
  content;
  cancelText;
  confirmText;
  confirmModal;
  cancelModal;
}

const Modal = ({
  userType,
  isOpen,
  title,
  content,
  cancelText,
  confirmText,
  confirmModal,
  cancelModal,
}: ModalProps) => {
  return (
    isOpen && (
      <ModalBackground>
        <ModalPosition>
          <ModalWrapper>
            <ModalTitleText>{title}</ModalTitleText>
            <ModalContentText>{content}</ModalContentText>
            <WrapButton>
              <Button
                userType={null}
                disabled={false}
                children={cancelText}
                onClick={cancelModal}
              ></Button>
              <Button
                userType={userType}
                disabled={false}
                children={confirmText}
                onClick={confirmModal}
              ></Button>
            </WrapButton>
          </ModalWrapper>
        </ModalPosition>
      </ModalBackground>
    )
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalPosition = styled.div`
  position: absolute;
  top: 30%;
  right: 1.1rem;
  left: 1.1rem;
`;

const ModalWrapper = styled.div`
  padding: 2rem 1rem 1rem 1rem;
  width: 100%;
  height: 14.125rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: var(--Base-White, #fff);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
`;

const ModalTitleText = styled.div`
  color: var(--Base-Black, #000);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1rem;
`;

const ModalContentText = styled.div`
  color: var(--Base-Deep-Gray, #5b5b5b);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1.5rem;
  white-space: pre-line;
`;
const WrapButton = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 1.1rem;
  right: 1.1rem;
  gap: 1rem;
`;

export default Modal;
