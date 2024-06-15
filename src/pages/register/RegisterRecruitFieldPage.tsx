import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import Category from '../../components/common/Category';
import categoryState from '../../constants/categoryState';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useRecruitState from '../../store/RecruitState';

const RegisterRecruitFieldPage = () => {
  const navigate = useNavigate();

  const { setRecruitState } = useRecruitState();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const isDisabled = selectedTags.length < 1;

  const hadnleClickTag = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        setTimeout(() => {
          toast.error('분야는 3개까지 선택이 가능합니다.');
        }, 0);
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const navigateToMethod = () => {
    navigate('/register/recruit/method');
  };

  useEffect(() => {
    setRecruitState({ field: selectedTags.join(',') });
  }, [setRecruitState, selectedTags]);

  return (
    <WrapContent>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 150,
        }}
        toastOptions={{
          style: {
            fontSize: '16px',
          },
        }}
      />

      <ButtonWrap>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={0} type={'nari'}></ProgressBar>
      <TitleText>
        어떤 분야의 동백님을 <br /> 찾으시나요?
        <p>분야는 3개까지 선택이 가능합니다.</p>
      </TitleText>
      <Category
        list={categoryState.list}
        type={'nari'}
        selectedTags={selectedTags}
        onClickTag={hadnleClickTag}
      ></Category>
      <WrapButton>
        <Button
          type={'nari'}
          disabled={isDisabled}
          children={'다음'}
          onClick={navigateToMethod}
        ></Button>
      </WrapButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  float: right;
  width: 5.7rem;
  height: 2.2rem;
  flex-shrink: 0;
  margin-bottom: 1.63rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1.56rem;

  p {
    font-size: 1rem;
    font-family: 'NanumSquare';
    font-weight: 400;
    margin-top: 1rem;
  }
`;

const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;

export default RegisterRecruitFieldPage;
