import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ExitHeader from '../../components/header/ExitHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import Button from '../../components/common/Button';
import { instance } from '../../api/instance';
import { useNavigate } from 'react-router-dom';
import { scaleImage } from '../../utils/scaleImage';
import ImageView from '../../components/chat/ImageView';

const WriteFreeBoard = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isShowImage, setIsShowImage] = useState(false);
  const [index, setIndex] = useState(0);

  //  사진추가 핸들러
  const handleImgSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이미지 크기 줄이기
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      for (const file of filesArray) {
        const scaleBlob = await scaleImage({
          file,
          scale: 0.5,
          format: file.type,
          quality: 0.7,
        });

        const inputFile = new File([scaleBlob], file.name, { type: file.type });

        try {
          const formData = new FormData();
          formData.append('image', inputFile);

          const response = await instance.post('/image', formData);
          const s3Link = response.data;
          setPreviewUrls((prev) => [...prev, s3Link]);
        } catch (error) {
          console.error('이미지 등록 실패:', error);
        }
      }
    }
  };

  const handleRemoveImage = (event: React.MouseEvent, index: number) => {
    event?.stopPropagation();
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // 이미지 크게 보기
  const viewImage = (index) => {
    setIndex(index);
    setIsShowImage(true);
  };

  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setSelectedTitle(value);
    if (name === 'content') setSelectedContent(value);
  };

  // 게시글 제출 핸들러
  const handleSubmit = async () => {
    if (!selectedTitle || !selectedContent) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }

    const data = {
      title: selectedTitle,
      content: selectedContent,
      image: previewUrls.join(','),
    };
    try {
      const response = await instance.post('/board/free', data);
      alert(response.data.message);
      navigate('/community');
    } catch (error) {
      console.error('게시글 생성에 실패했습니다:', error);
      alert('게시글 생성에 실패했습니다.');
    }
  };
  return (
    <>
      {isShowImage ? (
        <ImageView
          imgSrc={previewUrls[index]}
          handleCancel={() => setIsShowImage(false)}
        />
      ) : (
        <>
          <WrapContent>
            <ExitBtn>
              <ExitHeader userType={user?.userType} navigateTo={'-1'} />
            </ExitBtn>
            <TitleInput
              name="title"
              type="text"
              placeholder="제목을 입력하세요"
              value={selectedTitle}
              onChange={hadnleOnChagne}
            />
            <SplitLine />
            <ContentInput
              name="content"
              placeholder="내용을 입력하세요."
              value={selectedContent}
              onChange={hadnleOnChagne}
            />
          </WrapContent>
          <SplitRect />
          <WrapImage>
            <ImageBtn onClick={() => fileInputRef.current?.click()}>
              <img src="/assets/common/board-image-icon.png" alt="" />
              <p>사진추가</p>
            </ImageBtn>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              multiple
              onChange={handleImgSelect}
            />
            {/* 미리보기 이미지 */}
            <PreviewContainer>
              {previewUrls.map((url, index) => (
                <ImageWrapper key={index} onClick={() => viewImage(index)}>
                  <PreviewImage src={url} alt="미리보기" />
                  <RemoveButton
                    onClick={(event) => handleRemoveImage(event, index)}
                  >
                    <img
                      src="/assets/community/close-preview.svg"
                      alt="미리보기취소"
                    />
                  </RemoveButton>
                </ImageWrapper>
              ))}
            </PreviewContainer>
          </WrapImage>
          <Button
            userType={user?.userType || ''}
            disabled={false}
            children={'등록하기'}
            isBottom={true}
            onClick={handleSubmit}
          ></Button>
        </>
      )}
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.1rem 1rem 1.1rem;
  overflow-y: auto;
`;

const ExitBtn = styled.div`
  float: right;
  margin-bottom: 1.4rem;
`;

const TitleInput = styled.input`
  border: none;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  letter-spacing: 0.075rem;
  padding-bottom: 0.6rem;
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.0625rem;
  width: 100%;
  margin-bottom: 0.6rem;
`;

const ContentInput = styled.textarea`
  height: 30rem;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  letter-spacing: 0.03375rem;
  border: none;
`;

const SplitRect = styled.div`
  background: #ebeceb;
  height: 0.625rem;
`;

const WrapImage = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem 1.1rem 1rem 1.1rem;
  margin-bottom: 7rem;
`;

const ImageBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    width: 3.625rem;
    height: 3.625rem;
  }
  p {
    margin-top: 0.6rem;
    color: #5b5b5b;
    font-family: NanumSquare;
    font-weight: 700;
    white-space: nowrap;
  }
`;

const PreviewContainer = styled.div`
  flex-direction: row;
  overflow-x: scroll;
  white-space: nowrap;
  margin-left: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PreviewImage = styled.img`
  width: 5.8rem;
  height: 5.8rem;
  object-fit: cover;
  border-radius: 0.9375rem;
  margin-right: 0.5rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  padding: 0;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default WriteFreeBoard;
