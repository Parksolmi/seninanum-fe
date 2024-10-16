import { useState } from 'react';
import styled from 'styled-components';
import { MenuToggle } from './MenuToggle';

interface MessageInputProps {
  value;
  onChangeHandler;
  submitHandler;
}
const MessageInput = ({
  value,
  onChangeHandler,
  submitHandler,
}: MessageInputProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler();
  };

  const onClickPlusButton = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <WrapMessageInput $isMenuOpen={isMenuOpen}>
      <MeassageInputContainer $isMenuOpen={isMenuOpen}>
        <MenuToggle toggle={onClickPlusButton} isOpen={isMenuOpen} />
        <WrapInputForm onSubmit={handleSubmit}>
          <Input
            placeholder="메시지를 입려해주세요"
            value={value}
            onChange={onChangeHandler}
          />
          <WrapButton type="submit">
            <img src={'/assets/chat/send-icon.png'} alt="보내기" />
          </WrapButton>
        </WrapInputForm>
      </MeassageInputContainer>
      <ChatMenuContainer>
        <div>
          <WrapIcon>
            <img src="/assets/chat/image-icon.png" alt="이미지 전송하기" />
          </WrapIcon>
          <p>사진</p>
        </div>
        <div>
          <WrapIcon>
            <img src="/assets/chat/won-icon.png" alt="송금하기" />
          </WrapIcon>
          <p>송금</p>
        </div>
        <div>
          <WrapIcon>
            <img src="/assets/chat/calendar.png" alt="약속잡기" />
          </WrapIcon>
          <p>약속잡기</p>
        </div>
      </ChatMenuContainer>
    </WrapMessageInput>
  );
};

interface WrapMessageInputProp {
  $isMenuOpen: boolean;
}

const WrapMessageInput = styled.div<WrapMessageInputProp>`
  width: 100%;
  position: fixed;
  bottom: ${({ $isMenuOpen }) => ($isMenuOpen ? '0' : '-6.93rem')};
  transition: bottom 0.3s ease-in-out; /* 애니메이션 효과 추가 */
`;

const MeassageInputContainer = styled.div<WrapMessageInputProp>`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 3px rgba(150, 150, 150, 0.2);
  padding: ${({ $isMenuOpen }) =>
    $isMenuOpen ? '1.1rem 1.1rem 1.5rem 1.1rem' : '1.1rem 1.1rem 3rem 1.1rem'};
  transition: padding 0.3s ease-in-out; /* 애니메이션 효과 추가 */
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

const WrapButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;

  img {
    width: 1.5rem;
  }
`;

const ChatMenuContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 1rem;

  gap: 0.3rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 1.5rem;
  }

  p {
    color: #5b5b5b;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.0375rem;

    padding-top: 0.3rem;
  }
`;

const WrapIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  border-radius: 0.8125rem;
  background: var(--Base-Gray5, #f7f8f7);
`;

export default MessageInput;
