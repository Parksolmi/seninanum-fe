import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { instance } from '../../api/instance';
import { usePromiseToast } from '../../hooks/useToast';
import useCareerProfileState from '../../store/careerProfileState';

interface OutletContext {
  setStatus: (status: number) => void;
}

const RegisterProfileIntroductionPage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams<{ profileId: string }>();

  const { setStatus } = useOutletContext<OutletContext>();
  const { setCareerProfileState, careerProfileState, calculateProgress } =
    useCareerProfileState();

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();

  const updateIntroduction = async () => {
    try {
      const res = instance.patch('/career', {
        profileId: profileId,
        introduce: careerProfileState.introduce,
        progressStep: careerProfileState.progressStep,
        age: careerProfileState.age,
        field: careerProfileState.field,
        service: careerProfileState.service,
        method: careerProfileState.method,
        region: careerProfileState.region,
        priceType: careerProfileState.priceType,
        price: careerProfileState.price,
      });

      showAutoSaveToast(
        res,
        () => {
          calculateProgress();
          return '자동저장되었습니다.';
        },
        (error) => {
          console.log(error);
          return '자동저장에 실패하였습니다.';
        }
      );
      navigate(`/register/profile/condition/${profileId}`);
    } catch (error) {
      console.error('자동저장에 실패하였습니다.', error);
    }
  };

  // const navigateCondition = () => {
  //   updateIntroduction();
  //   navigate(`/register/profile/condition/${profileId}`);
  // };

  // useEffect(() => {
  //   setCareerProfileState({ introduce: selectedIntroduce });
  // }, [setCareerProfileState, selectedIntroduce]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCareerProfileState({ [name]: value });
  };

  useEffect(() => {
    setStatus(2);
  }, [setStatus]);

  return (
    <WrapContent>
      <h3>{`동백님은 어떤 사람인가요?`}</h3>
      <p>자기소개</p>

      <TextArea
        name="introduce"
        inputPlaceholder="동백님을 소개해주세요."
        onChange={handleOnChange}
        value={careerProfileState.introduce || ''}
      ></TextArea>

      <div className="margin"></div>

      <GapButton></GapButton>
      <WrapButtonContainer>
        <WrapButton>
          <Button
            userType={null}
            disabled={false}
            children={'이전'}
            onClick={() => navigate(`/register/profile/career/${profileId}`)}
          ></Button>
          <Button
            userType={'dong'}
            disabled={false}
            children={'다음'}
            onClick={updateIntroduction}
          ></Button>
        </WrapButton>
      </WrapButtonContainer>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.1rem 1.1rem;

  h3 {
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.03rem;
    margin: 1rem 0;
  }

  p {
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 400;
    letter-spacing: 0.0275rem;
    margin: 1.5rem 0 0.8rem 0;
  }
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
