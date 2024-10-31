import React, { useState } from 'react';
import styled from 'styled-components';
import ExitHeader from '../../components/header/ExitHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import Button from '../../components/common/Button';
import { instance } from '../../api/instance';
import { useNavigate } from 'react-router-dom';

const WriteFreeBoard = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedContent, setSelectedContent] = useState('');

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
        <ImageBtn>
          <img src="/assets/common/board-image-icon.png" alt="" />
          <p>사진추가</p>
        </ImageBtn>
        <Button
          userType={user?.userType || ''}
          disabled={false}
          children={'등록하기'}
          isBottom={true}
          onClick={handleSubmit}
        ></Button>
      </WrapImage>
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
  flex-direction: column;
  padding: 1.5rem 1.1rem 1rem 1.1rem;
  margin-bottom: 7rem;
  overflow-y: auto;
`;

const ImageBtn = styled.div`
  img {
    width: 3.625rem;
    height: 3.625rem;
  }
  p {
    margin-top: 0.6rem;
    color: #5b5b5b;
    font-family: NanumSquare;
    font-weight: 700;
    letter-spacing: 0.025rem;
  }
`;

export default WriteFreeBoard;
