import React from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';

const RegisterProfileIntroductionPage = () => {
  const onChange = () => {};
  const handlePrevButtonClick = () => {
    window.location.href = '/register/profile/career';
  };
  const handleNextButtonClick = () => {
    window.location.href = '/register/profile/condition';
  };
  return (
    <WrapContent>
      <ButtonWrap>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={1} type={'dong'}></ProgressBar>
      <CategoryText>{`동백님은 어떤 사람인가요?`}</CategoryText>
      <SubText>프로필 사진</SubText>
      <LastSubText>{`얼굴이 잘 나온 사진은 \n상대에게 좋은 인상을 줄 수 있어요!`}</LastSubText>
      <PictureArea>
        <img src="/assets/common/camera-icon.svg" alt="사진" />
      </PictureArea>
      <SubText>자기소개</SubText>
      <TextArea
        inputPlaceholder="동백님을 소개해주세요."
        onChange={onChange}
      ></TextArea>

      <WrapButton>
        <Button
          type={null}
          disabled={false}
          children={'이전'}
          onClick={handlePrevButtonClick}
        ></Button>
        <Button
          type={'dong'}
          disabled={false}
          children={'다음'}
          onClick={handleNextButtonClick}
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

const SubText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.0275rem;
  margin-top: 1.3rem;
  margin-bottom: 0.8rem;
`;

const LastSubText = styled.div`
  color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PictureArea = styled.div`
  width: 5.8125rem;
  height: 5.8125rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const WrapButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
  gap: 1rem;
`;
export default RegisterProfileIntroductionPage;
