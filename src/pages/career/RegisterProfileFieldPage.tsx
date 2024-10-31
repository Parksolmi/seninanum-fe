import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { usePromiseToast, useToast } from '../../hooks/useToast';
import { useUpdateCareerProfile } from '../../hooks/useUpdateCareerProfile';
import { CareerProfile } from '../../interface/careerProfileInterface';
import Category from '../../components/common/Category';
import categoryState from '../../constants/categoryState';
import PrevNextButton from '../../components/common/PrevNextButton';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfile: CareerProfile;
  setCareerProfile: (careerProfile: CareerProfile) => void;
}

const RegisterProfileFieldPage = () => {
  const navigate = useNavigate();
  const { careerProfileId } = useParams<{ careerProfileId: string }>();
  const { setStatus, careerProfile, setCareerProfile } =
    useOutletContext<OutletContext>();
  const [selectedTags, setSelectedTags] = useState<string[]>(
    careerProfile.field ? careerProfile.field.split(',') : []
  );

  const { updateProfile } = useUpdateCareerProfile(
    careerProfileId,
    careerProfile
  );

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();
  const { showToast: showSelectionError } = useToast(
    () => <span>분야는 3개까지 선택이 가능합니다.</span>,
    'select-exceed-error',
    'bottom-center'
  );

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

  const hadnleClickTag = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        // 렌더링 이후에 showSelectionError 호출
        setTimeout(() => showSelectionError(), 0);
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
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
    // selectedAgeTags 또는 selectedTags가 변경되었을 때만 상태 업데이트
    if (careerProfile.field !== selectedTags.join(',')) {
      setCareerProfile({
        ...careerProfile,
        field: selectedTags.join(','),
      });
    }
  }, [careerProfile, selectedTags, setCareerProfile]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    setStatus(2);
  }, [setStatus]);

  return (
    <WrapContent>
      <h3>제공할 서비스를 알려주세요!</h3>

      <WrapSection>
        <div className="title">
          희망 활동 분야<Satisfy>필수*</Satisfy>
          <p>최대 3개까지 선택 가능해요.</p>
        </div>

        <Category
          label=""
          list={categoryState.list}
          type={'dong'}
          selectedTags={selectedTags}
          onClickTag={hadnleClickTag}
        ></Category>
      </WrapSection>

      <WrapSection>
        <div className="title">제공할 서비스</div>
        <TextArea
          name="service"
          inputPlaceholder={`예시)\n문과 수시 입시에 맞춘 전문적인 자기소개서 첨삭 및 세부특기사항 멘토링`}
          onChange={handleOnChange}
          value={careerProfile?.service || ''}
        />
        <div className="margin"></div>
      </WrapSection>

      <Gap />
      <PrevNextButton
        leftText={'이전'}
        rightText={'다음'}
        leftDisabled={false}
        rightDisabled={false}
        leftUserType={null}
        rightUserType={'dong'}
        handlePrev={() => handleAutoSave('prev')}
        handleNext={() => handleAutoSave('next')}
      />
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.1rem 1.1rem;

  h3 {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.03rem;
  }
`;

const WrapSection = styled.div`
  .title {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 500;
    letter-spacing: 0.0275rem;
    margin-bottom: 1rem;
  }

  p {
    color: #8e8e8e;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 0.5rem;
  }

  &.last-section {
    margin-bottom: 8rem;
  }
`;

const Gap = styled.div`
  margin-bottom: 8rem;
`;

const Satisfy = styled.div`
  display: flex;
  color: #ff314a;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.025rem;
  display: inline;
  margin-left: 0.5rem;
`;

export default RegisterProfileFieldPage;
