import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface ModalProps {
  userType: string;
  title: string;
  content: string;
  cancelText: string;
  confirmText: string;
  onConfirm: (id?: number) => void;
  onCancel?: () => void;
}

const Modal = ({
  userType,
  title,
  content,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
}: ModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel?.();
  };

  return (
    <>
      <ModalPosition>
        <ModalWrapper>
          <h3 className="title">{title}</h3>
          <p className="content">{content}</p>
          <WrapButton>
            {onCancel && (
              <Button
                userType={null}
                disabled={false}
                children={cancelText}
                onClick={onCancel}
                isFixed={false}
              />
            )}
            <Button
              userType={userType}
              disabled={false}
              children={confirmText}
              onClick={handleConfirm}
              isFixed={false}
            />
          </WrapButton>
        </ModalWrapper>
      </ModalPosition>
      <ModalBackground />
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

const ModalPosition = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: calc(100% - 2.2rem);
  border-radius: 0.9375rem;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 999;
  overflow: hidden;
`;

const ModalWrapper = styled.div`
  padding: 2rem 1rem 1rem 1rem;
  width: 100%;
  /* height: auto; */
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: var(--Base-White, #fff);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);

  text-align: center;
  font-family: NanumSquare;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .title {
    color: var(--Base-Black, #000);
    font-size: 1.375rem;
    margin-bottom: 1rem;
  }

  .content {
    color: var(--Base-Deep-Gray, #5b5b5b);
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    white-space: pre-line;
  }
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default Modal;
