import React, { useState } from 'react';
import styled from 'styled-components';
import ExitHeader from '../../components/header/ExitHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import Button from '../../components/common/Button';
import { instance } from '../../api/instance';
import { useNavigate } from 'react-router-dom';

const WriteAdviceBoard = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedContent, setSelectedContent] = useState('');

  const handleOnChange = (e) => {
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
      const response = await instance.post('/board/advice', data);
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
          <ExitHeader userType={user?.userType} navigateTo={'/community'} />
        </ExitBtn>
        <TitleInput
          name="title"
          type="text"
          placeholder="무슨 고민이 있으신가요?"
          value={selectedTitle}
          onChange={handleOnChange}
        />
        <SplitLine />
        <ContentInput
          name="content"
          placeholder="편하게 얘기해보세요."
          value={selectedContent}
          onChange={handleOnChange}
        />
      </WrapContent>
      <WrapButton>
        <Button
          userType={user?.userType || ''}
          disabled={false}
          children={'등록하기'}
          isBottom={true}
          onClick={handleSubmit}
        ></Button>
      </WrapButton>
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

const WrapButton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.1rem 1rem 1.1rem;
  margin-bottom: 7rem;
  overflow-y: auto;
`;

export default WriteAdviceBoard;
