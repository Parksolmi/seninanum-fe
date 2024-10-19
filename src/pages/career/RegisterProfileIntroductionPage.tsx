import React, { useEffect } from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { usePromiseToast } from '../../hooks/useToast';
import { useUpdateCareerProfile } from '../../hooks/useUpdateCareerProfile';
import { CareerProfile } from '../../interface/careerProfileInterface';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfile: CareerProfile;
  setCareerProfile: (careerProfile: CareerProfile) => void;
}

const RegisterProfileIntroductionPage = () => {
  const navigate = useNavigate();
  const { careerProfileId } = useParams<{ careerProfileId: string }>();
  const { setStatus, careerProfile, setCareerProfile } =
    useOutletContext<OutletContext>();

  const { updateProfile } = useUpdateCareerProfile(careerProfileId);

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();

  // 입력값 변경 핸들러
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof CareerProfile;

    // 상태 업데이트
    setCareerProfile({
      ...careerProfile,
      [key]: value,
    });
  };

  const handleAutoSave = (where) => {
    showAutoSaveToast(
      updateProfile(),
      () => '자동 저장되었습니다.',
      (error) => {
        console.log(error);
        return '자동 저장에 실패하였습니다.';
      }
    );
    if (where === 'next') {
      navigate(`/register/profile/condition/${careerProfileId}`);
    } else if (where === 'prev') {
      navigate(`/register/profile/career/${careerProfileId}`);
    }
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
        value={careerProfile?.introduce || ''}
      />

      <div className="margin"></div>

      <GapButton />
      <WrapButtonContainer>
        <WrapButton>
          <Button
            userType={null}
            disabled={false}
            children={'이전'}
            onClick={() => handleAutoSave('prev')}
          ></Button>
          <Button
            userType={'dong'}
            disabled={false}
            children={'다음'}
            onClick={() => handleAutoSave('next')}
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
