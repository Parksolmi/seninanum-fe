import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { instance } from '../../api/instance';
import { usePromiseToast } from '../../hooks/useToast';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfileState: {
    introduce: string;
    progressStep: number;
    age: string;
    field: string;
    service: string;
    method: string;
    region: string;
    priceType: string;
    price: number;
    // 기타 필요한 상태 값들
  };
  setCareerProfileState: (
    state: Partial<{
      introduce: string;
      progressStep: number;
      age: string;
      field: string;
      service: string;
      method: string;
      region: string;
      priceType: string;
      price: number;
      // 기타 필요한 상태 값들
    }>
  ) => void;
  calculateProgress: () => void;
}
const RegisterProfileIntroductionPage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams<{ profileId: string }>();
  const {
    setStatus,
    setCareerProfileState,
    careerProfileState,
    calculateProgress,
  } = useOutletContext<OutletContext>();
  // const { setCareerProfileState, careerProfileState, calculateProgress } =
  //   useCareerProfileState();
  const [selectedIntroduce, setSelectedIntroduce] = useState<string>(
    careerProfileState.introduce || ''
  );

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'introduce') {
      setSelectedIntroduce(value);
    }
    setCareerProfileState({ [name]: value });
  };

  const updateIntroduction = async () => {
    try {
      calculateProgress(); //? 이거 안해도 되지 않나?

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
        (res) => {
          return '자동저장되었습니다.';
        },
        (error) => {
          console.log(error);
          return '자동저장에 실패하였습니다.';
        }
      );
    } catch (error) {
      console.error('자동저장에 실패하였습니다.', error);
    }
  };

  const navigateCondition = () => {
    updateIntroduction();
    navigate(`/register/profile/condition/${profileId}`);
  };

  useEffect(() => {
    setCareerProfileState({ introduce: selectedIntroduce });
  }, [setCareerProfileState, selectedIntroduce]);

  useEffect(() => {
    setStatus(2);
  }, [setStatus]);

  return (
    <>
      <CategoryText>{`동백님은 어떤 사람인가요?`}</CategoryText>
      <SubText>자기소개</SubText>
      <LastSubText>{`자신을 잘 나타낼 수 있는 키워드를\n넣어 자기 소개를 완성해보세요!\n`}</LastSubText>

      <TextArea
        name="introduce"
        inputPlaceholder="동백님을 소개해주세요."
        onChange={handleOnChange}
        value={selectedIntroduce}
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
            onClick={navigateCondition}
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
