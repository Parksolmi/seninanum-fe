import styled from 'styled-components';
import { MenuToggle } from './MenuToggle';
import React, { useRef } from 'react';
import { scaleImage } from '../../utils/scaleImage';
import { instance } from '../../api/instance';

interface MessageInputProps {
  value;
  onChangeHandler;
  submitHandler;
  isMenuOpen;
  setIsMenuOpen;
  openSchedule: () => void;
  setIsSend: (boolean) => void;
  previewUrl: any;
  setPreviewUrl: (any) => void;
  setImageLink: (string) => void;
}
const MessageInput = ({
  value,
  onChangeHandler,
  submitHandler,
  isMenuOpen,
  setIsMenuOpen,
  openSchedule,
  setIsSend,
  previewUrl,
  setPreviewUrl,
  setImageLink,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files?.[0];
      // 이미지 크기를 50%로 줄임
      const scaledBlob = await scaleImage({
        file: selectedFile,
        scale: 0.5,
        format: selectedFile.type,
        quality: 0.7,
      });

      // Blob을 File로 변환
      const inputFile = new File([scaledBlob], selectedFile.name, {
        type: selectedFile.type,
      });

      try {
        const formData = new FormData();
        formData.append('image', inputFile);

        const s3Link = await instance.post('/image', formData);

        setPreviewUrl(URL.createObjectURL(inputFile));
        setIsMenuOpen(false);
        setImageLink(s3Link.data);
      } catch (error) {
        console.error('수정 실패:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitHandler();
    setIsSend(true);
  };

  const onClickPlusButton = () => {
    setIsMenuOpen((prev) => !prev);
    setPreviewUrl(null);
  };

  const deleteImage = () => {
    setPreviewUrl(null);
  };

  return (
    <>
      <WrapMessageInput $isMenuOpen={isMenuOpen}>
        <MeassageInputContainer $isMenuOpen={isMenuOpen}>
          <MenuToggle toggle={onClickPlusButton} isOpen={isMenuOpen} />
          <WrapInputForm onSubmit={handleSubmit}>
            {previewUrl ? (
              <ImagePreview>
                <img
                  className="x-button"
                  src="/assets/chat/cancel.png"
                  alt=""
                  onClick={deleteImage}
                />
                <img
                  className="image-preview"
                  src={previewUrl}
                  alt="미리보기"
                />
              </ImagePreview>
            ) : (
              <Input
                placeholder="메시지를 입력해주세요"
                value={value}
                onChange={onChangeHandler}
              />
            )}
            <WrapButton type="submit">
              <img src={'/assets/chat/send-icon.png'} alt="보내기" />
            </WrapButton>
          </WrapInputForm>
        </MeassageInputContainer>
        <ChatMenuContainer>
          <div>
            <WrapIcon>
              <label htmlFor="fileInput">
                <img
                  src="/assets/chat/image-icon.png"
                  alt="이미지 전송하기"
                  onClick={() => fileInputRef.current?.click()}
                />
              </label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </WrapIcon>
            <p>사진</p>
          </div>
          <div>
            <WrapIcon
              onClick={() => {
                alert('서비스 준비중입니다!');
              }}
            >
              <img src="/assets/chat/won-icon.png" alt="송금하기" />
            </WrapIcon>
            <p>송금</p>
          </div>
          <div>
            <WrapIcon>
              <img
                src="/assets/chat/calendar.png"
                alt="약속잡기"
                onClick={openSchedule}
              />
            </WrapIcon>
            <p>약속잡기</p>
          </div>
        </ChatMenuContainer>
      </WrapMessageInput>
    </>
  );
};

interface WrapMessageInputProp {
  $isMenuOpen: boolean;
}

const WrapMessageInput = styled.div<WrapMessageInputProp>`
  width: 100%;
  position: fixed;
  bottom: ${({ $isMenuOpen }) => ($isMenuOpen ? '0' : '-6.93rem')};
  transition: bottom 0.3s ease-in-out;
`;

const MeassageInputContainer = styled.div<WrapMessageInputProp>`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 3px rgba(150, 150, 150, 0.2);
  padding: ${({ $isMenuOpen }) =>
    $isMenuOpen ? '1.1rem 1.1rem 1.5rem 1.1rem' : '1.1rem 1.1rem 3rem 1.1rem'};
  transition: padding 0.3s ease-in-out;
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
  justify-content: space-between;
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

  background-color: white;
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

const ImagePreview = styled.div`
  display: flex;
  width: 50%;
  height: 50%;
  //position: absolute;
  position: relative;

  .image-preview {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .x-button {
    position: absolute;
    top: 50;
    right: 0;
    width: 35px;
    /* background-color: #fff; */
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
  }
`;

export default MessageInput;
