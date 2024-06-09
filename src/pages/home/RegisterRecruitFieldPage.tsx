import React from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import Category from '../../components/common/Category';
import categoryState from '../../constants/categoryState';
import Button from '../../components/common/Button';

const RegisterRecruitFieldPage = () => {
  const onClick = () => {
    window.location.href = '/register/recruit/method';
  };
  return (
    <WrapContent>
      <ButtonWrap>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={0} type={'nari'}></ProgressBar>
      <CategoryText>{`어떤 분야의 동백님을 \n 찾으시나요?`}</CategoryText>
      <Category label="" list={categoryState.list} type={'nari'}></Category>
      <WrapButton>
        <Button
          type={'nari'}
          disabled={false}
          children={'다음'}
          onClick={onClick}
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

const CategoryText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.03rem;
  margin-top: 5.1rem;
  margin-bottom: 1.56rem;
  white-space: pre-line;
`;

const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;

export default RegisterRecruitFieldPage;
