import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

interface ModalProps {
  userType: string;
  title: string | React.ReactNode;
  content?: React.ReactNode; // 기존 content는 제거 가능
  confirmText: string;
  onConfirm: (value: number) => void; // 파라미터로 숫자를 받도록 수정
  onCancel?: () => void;
}

const PayModal = ({
  userType,
  title,
  confirmText,
  onConfirm,
  onCancel,
}: ModalProps) => {
  const [inputValue, setInputValue] = useState<string>(''); // Input 상태 관리

  const handleConfirm = () => {
    const value = parseFloat(inputValue); // 숫자로 변환
    if (!isNaN(value)) {
      onConfirm(value); // 숫자 값 전달
      onCancel?.();
    }
  };

  return (
    <>
      <ModalPosition>
        <ModalWrapper>
          <WrapHeader $userType={userType}>
            <h3 className="title">{title}</h3>
            <img
              className="cancel"
              src="/assets/common/cancel-button.png"
              alt="취소버튼"
              onClick={onCancel}
            />
          </WrapHeader>
          <div className="content">
            <input
              type="number"
              placeholder="금액을 입력하세요."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <WrapButton>
            <Button
              userType={userType}
              disabled={!inputValue.trim()} // 입력값이 없으면 비활성화
              children={confirmText}
              onClick={handleConfirm}
              isBottom={false}
            />
          </WrapButton>
        </ModalWrapper>
      </ModalPosition>
      <ModalBackground />
    </>
  );
};

// 스타일은 기존과 동일
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

const WrapHeader = styled.div<{ $userType }>`
  display: flex;
  justify-content: space-between;

  .title {
    color: ${({ $userType }) =>
      $userType === 'dong' ? 'var(--Primary-dong)' : 'var(--Primary-nari)'};
    font-family: 'NanumSquare';
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  img {
    width: 1.375rem;
    height: 1.375rem;
  }
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
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem 1.2rem;
  width: 100%;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: var(--Base-White, #fff);
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);

  text-align: center;
  font-family: NanumSquare;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .content {
    width: 100%;
    color: var(--Base-Deep-Gray, #5b5b5b);
    font-size: 1.125rem;
    margin-bottom: 0.5rem;

    input {
      width: 100%;
      padding: 0.9rem 0.7rem 0.7rem 0.7rem;
      border-radius: 1.25rem;
      background: var(--Base-Gray2, #ebeceb);
      border: none;

      font-family: NanumSquare;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.0375rem;

      &::placeholder {
        color: var(--Base-Gray1, #414040);
      }
    }
  }
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default PayModal;
