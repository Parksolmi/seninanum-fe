import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { usePromiseToast, useToast } from '../../hooks/useToast';
import { useUpdateCareerProfile } from '../../hooks/useUpdateCareerProfile';
import { CareerProfile } from '../../interface/careerProfileInterface';
import Category from '../../components/common/Category';
import categoryState from '../../constants/categoryState';

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
          희망 활동 분야<p>최대 3개까지 선택 가능해요.</p>
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
          name="introduce"
          inputPlaceholder={`예시)\n문과 수시 입시에 맞춘 전문적인 자기소개서 첨삭 및 세부특기사항 멘토링`}
          onChange={handleOnChange}
          value={careerProfile?.introduce || ''}
        />
        <div className="margin"></div>
      </WrapSection>

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

    // <WrapContent>
    //   <h3>{`동백님은 어떤 사람인가요?`}</h3>
    //   <p>자기소개</p>

    //   <TextArea
    //     name="introduce"
    //     inputPlaceholder="동백님을 소개해주세요."
    //     onChange={handleOnChange}
    //     value={careerProfile?.introduce || ''}
    //   />

    //   <div className="margin"></div>

    //   <GapButton />
    //   <WrapButtonContainer>
    //     <WrapButton>
    //       <Button
    //         userType={null}
    //         disabled={false}
    //         children={'이전'}
    //         onClick={() => handleAutoSave('prev')}
    //       ></Button>
    //       <Button
    //         userType={'dong'}
    //         disabled={false}
    //         children={'다음'}
    //         onClick={() => handleAutoSave('next')}
    //       ></Button>
    //     </WrapButton>
    //   </WrapButtonContainer>
    // </WrapContent>
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

// const LastSubText = styled.div`
//   color: #8e8e8e;
//   font-family: NanumSquare;
//   font-size: 1.25rem;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// `;

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
export default RegisterProfileFieldPage;
