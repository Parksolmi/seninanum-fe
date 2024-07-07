import React from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import useCareerProfileState from '../../store/CareerProfileState';
import { useOutletContext } from 'react-router-dom';

interface ProgressContextType {
  incrementStatus: () => void;
  decrementStatus: () => void;
}
const RegisterProfileIntroductionPage = () => {
  const navigate = useNavigate();
  const { setCareerProfileState } = useCareerProfileState();
  const { incrementStatus, decrementStatus } =
    useOutletContext<ProgressContextType>();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCareerProfileState({ [name]: value });
  };

  const navigateToRegisterProfileCareer = () => {
    decrementStatus();
    navigate('/register/profile/career');
  };
  const navigateToRegisterProfileCondition = () => {
    incrementStatus();
    navigate('/register/profile/condition');
  };

  return (
    <>
      <CategoryText>{`동백님은 어떤 사람인가요?`}</CategoryText>
      <SubText>프로필 사진</SubText>
      <LastSubText>{`얼굴이 잘 나온 사진은 \n상대에게 좋은 인상을 줄 수 있어요!`}</LastSubText>
      <PictureArea>
        <img src="/assets/common/camera-icon.svg" alt="사진" />
      </PictureArea>
      <SubText>자기소개</SubText>
      <TextArea
        name="introduce"
        inputPlaceholder="동백님을 소개해주세요."
        onChange={handleOnChange}
      ></TextArea>
      <div className="margin"></div>

      <WrapButtonContainer>
        <WrapButton>
          <Button
            userType={null}
            disabled={false}
            children={'이전'}
            onClick={navigateToRegisterProfileCareer}
          ></Button>
          <Button
            userType={'dong'}
            disabled={false}
            children={'다음'}
            onClick={navigateToRegisterProfileCondition}
          ></Button>
        </WrapButton>
      </WrapButtonContainer>
    </>
  );
};

const CategoryText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03rem;
  margin-top: 3rem;
  margin-bottom: 1.56rem;
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
