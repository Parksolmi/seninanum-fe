import React from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const RegisterProfileIntroductionPage = () => {
  const onChange = () => {};
  const navigate = useNavigate();
  const navigateToRegisterProfileCareer = () => {
    navigate('/register/profile/career');
  };
  const navigateToRegisterProfileCondition = () => {
    navigate('/register/profile/condition');
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

      <WrapButtonContainer>
        <WrapButton>
          <Button
            type={null}
            disabled={false}
            children={'이전'}
            onClick={navigateToRegisterProfileCareer}
          ></Button>
          <Button
            type={'dong'}
            disabled={false}
            children={'다음'}
            onClick={navigateToRegisterProfileCondition}
          ></Button>
        </WrapButton>
      </WrapButtonContainer>
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

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
`;
const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export default RegisterProfileIntroductionPage;
