import styled from 'styled-components';
import React, { forwardRef } from 'react';

interface CommunityInputProps {
  value?: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler?: () => void;
  userType: string;
  isSecret?: boolean;
  setIsSecret?: (value: boolean) => void;
}
const CommunityInput = forwardRef<HTMLInputElement, CommunityInputProps>(
  (
    { value, onChangeHandler, submitHandler, userType, isSecret, setIsSecret },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (submitHandler) submitHandler();
    };

    // const onClickSecretButton = () => {
    //   setIsMenuOpen((prev) => !prev);
    // };

    return (
      <>
        <WrapMessageInput>
          <MeassageInputContainer>
            <WrapCheckBox $userType={userType}>
              <input
                className="checkbox"
                type="checkbox"
                checked={isSecret}
                onChange={(e) => setIsSecret && setIsSecret(e.target.checked)}
              />
              <p>비밀</p>
            </WrapCheckBox>
            <WrapInputForm onSubmit={handleSubmit}>
              <Input
                placeholder="댓글을 입력해주세요"
                value={value}
                onChange={onChangeHandler}
                ref={ref}
              />
              <WrapButton type="submit">
                <img src={'/assets/chat/send-icon.png'} alt="보내기" />
              </WrapButton>
            </WrapInputForm>
          </MeassageInputContainer>
        </WrapMessageInput>
      </>
    );
  }
);
const WrapMessageInput = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const MeassageInputContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 3px rgba(150, 150, 150, 0.2);
  padding: 1.1rem 1.1rem 2rem 1.1rem;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0.2rem 0.4rem;
  font-size: 1.25rem;
  font-weight: 400;
  font-family: NanumSquare;
  font-style: normal;
  line-height: normal;

  &::placeholder {
    color: var(--Base-Gray-3, #8e8e8e);
  }
`;

const WrapInputForm = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  width: auto;
  padding: 0.5rem 0.7rem;
  border-radius: 0.625rem;
  background: #f7f8f7;
`;

interface WrapCheckBoxProp {
  $userType: string;
}

const WrapCheckBox = styled.div<WrapCheckBoxProp>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;

  p {
    color: ${({ $userType }) =>
      $userType === 'dong'
        ? 'var(--Primary-dong, #FF314A)'
        : 'var(--Nari-2, var(--Primary-nari, #ffaa0e))'};
    text-align: center;
    font-family: NanumSquare;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 1rem */
    letter-spacing: 0.03rem;
  }

  .checkbox {
    appearance: none; /* 기본 체크박스 숨기기 */
    width: 1.7rem;
    height: 1.7rem;
    border: 2.5px solid var(--Base-Gray, #8e8e8e); /* 커스텀 border */
    border-radius: 0.375rem;
    cursor: pointer;
    position: relative;
    margin-right: 0.4rem;

    &:checked {
      background-color: ${({ $userType }) =>
        $userType === 'dong' ? '#FF314A' : '#ffd111'};
      border: none;
    }

    &:checked::before {
      content: '✔';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      color: white;
    }
  }
`;

const WrapButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;

  img {
    width: 1.5rem;
  }
`;

export default CommunityInput;
