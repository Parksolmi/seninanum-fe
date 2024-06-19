import styled from 'styled-components';

interface MessageInputProps {
  setVisible: () => void;
}
const MessageInput = ({ setVisible }: MessageInputProps) => {
  return (
    <MeassageInputContainer>
      <WrapButton>
        <img src={'/assets/chat/plus-icon.png'} alt="신고하기" />
      </WrapButton>
      <WrapInputForm>
        <Input placeholder="메시지를 입려해주세요" />
        <WrapButton type="submit" onClick={setVisible}>
          <img src={'/assets/chat/send-icon.png'} alt="보내기" />
        </WrapButton>
      </WrapInputForm>
    </MeassageInputContainer>
  );
};

const MeassageInputContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  background: #ffffff;
  width: 100%;
  box-shadow: 0px -2px 3px rgba(150, 150, 150, 0.2);

  padding: 1.1rem 1.1rem 2rem 1.1rem;

  position: fixed;
  bottom: 0;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0.2rem 0.4rem;

  font-size: 1.25rem;
  &::placeholder {
    font-size: 1.25rem;
  }
`;

const WrapInputForm = styled.div`
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

export default MessageInput;
