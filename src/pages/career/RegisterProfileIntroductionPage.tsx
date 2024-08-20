import React from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import useCareerProfileState from '../../store/CareerProfileState';
import progressStore from '../../store/CareerProgressState';

const RegisterProfileIntroductionPage = () => {
  const navigate = useNavigate();
  const { setCareerProfileState } = useCareerProfileState();
  const { setStatus } = progressStore();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCareerProfileState({ [name]: value });
  };

  const navigateToRegisterProfileCareer = () => {
    setStatus(1);
    navigate('/register/profile/career');
  };
  const navigateToRegisterProfileCondition = () => {
    setStatus(3);
    navigate('/register/profile/condition');
  };

  return (
    <>
      <CategoryText>{`동백님은 어떤 사람인가요?`}</CategoryText>
      <SubText>자기소개</SubText>
      <LastSubText>{`자신을 잘 나타낼 수 있는 키워드를\n넣어 자기 소개를 완성해보세요!\n`}</LastSubText>
      <TextArea
        name="introduce"
        inputPlaceholder="동백님을 소개해주세요."
        onChange={handleOnChange}
      ></TextArea>
      <div className="margin"></div>

      <GapButton></GapButton>
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
  font-weight: 700;
  letter-spacing: 0.0275rem;
  margin-bottom: 0.8rem;
`;

const LastSubText = styled.div`
  color: #8e8e8e;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1rem;
  white-space: pre;
`;

const GapButton = styled.div`
  margin-bottom: 8rem;
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
