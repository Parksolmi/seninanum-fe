import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Category from '../../components/common/Category';
import ageState from './../../constants/ageState';
import InputPrice from '../../components/common/InputPrice';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import regionState from '../../constants/regionState';
import Dropdown from '../../components/common/DropDown';
import Modal from '../../components/common/Modal';
import { usePromiseToast, useToast } from '../../hooks/useToast';
import useModal from '../../hooks/useModal';
import { useUpdateCareerProfile } from '../../hooks/useUpdateCareerProfile';
import { CareerProfile } from '../../interface/careerProfileInterface';
import PrevNextButton from '../../components/common/PrevNextButton';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfile: CareerProfile;
  setCareerProfile: (careerProfile: CareerProfile) => void;
}

const RegisterProfileConditionPage = () => {
  const navigate = useNavigate();
  const { setStatus, careerProfile, setCareerProfile } =
    useOutletContext<OutletContext>();
  const { careerProfileId } = useParams<{ careerProfileId: string }>();

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

  const [selectedAgeTags, setSelectedAgeTags] = useState<string[]>(
    careerProfile.age ? careerProfile.age.split(',') : []
  );

  // 모달
  const {
    openModal: openSelectRegionModal,
    closeModal: closeSelectRegionModal,
  } = useModal((id) => (
    <Modal
      userType={'dong'}
      title={'희망 지역을 등록해주세요!'}
      content={`대면서비스를 원하시면 \n희망 지역을 선택해주세요.`}
      cancelText={'취소'}
      confirmText={'이대로 제출하기'}
      onConfirm={updateProfile}
      onCancel={closeSelectRegionModal}
    />
  ));

  const hadnleClickAgeTag = (tag) => {
    setSelectedAgeTags((prevTags) => {
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

  // "다음" 버튼 활성화 여부 결정
  const handleNextButton = () => {
    if (
      (careerProfile.method === '대면' ||
        careerProfile.method === '모두 선택') &&
      careerProfile.region === ''
    ) {
      // 지역 선택이 없으면 모달 띄우기
      openSelectRegionModal();
    } else {
      updateProfile();
      navigate('/home');
      setStatus(1);
    }
  };

  const handlePrevButton = () => {
    showAutoSaveToast(
      updateProfile(),
      () => '자동 저장되었습니다.',
      (error) => {
        console.log(error);
        return '자동 저장에 실패하였습니다.';
      }
    );
    navigate(`/register/profile/field/${careerProfileId}`);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof CareerProfile;

    // 값 변환 처리
    const updatedValue = key === 'price' ? Number(value) : value;

    // 상태 업데이트
    setCareerProfile({
      ...careerProfile,
      [key]: updatedValue,
    });
  };

  useEffect(() => {
    // selectedAgeTags 또는 selectedTags가 변경되었을 때만 상태 업데이트
    if (careerProfile.age !== selectedAgeTags.join(',')) {
      setCareerProfile({
        ...careerProfile,
        age: selectedAgeTags.join(','),
      });
    }
  }, [careerProfile, selectedAgeTags, setCareerProfile]);

  useEffect(() => {
    setStatus(3);
  }, [setStatus]);

  return (
    <WrapContent>
      <h3>
        자기소개서와
        <br />
        희망 조건을 완성해보세요!
      </h3>

      <WrapSection>
        <div className="title">
          소개 한마디<Satisfy>필수*</Satisfy>
        </div>
        <InputService
          name="service"
          onChange={handleOnChange}
          placeholder="짧은 인사로 좋은 인상을 남겨보세요."
          value={careerProfile.service || ''}
        />
      </WrapSection>
      <WrapSection>
        <div className="title">희망 연령대</div>
        <Category
          label=""
          list={ageState.list}
          type={'dong'}
          selectedTags={selectedAgeTags === null ? [] : selectedAgeTags}
          onClickTag={hadnleClickAgeTag}
        />
      </WrapSection>

      <WrapSection>
        <div className="title">희망 활동 형태</div>
        <MethodButtonContainer>
          {['대면', '비대면', '모두 선택'].map((method) => (
            <MethodButton
              key={method}
              $isSelected={careerProfile.method === method}
              onClick={() =>
                setCareerProfile({ ...careerProfile, method: method })
              }
            >
              {method}
            </MethodButton>
          ))}
        </MethodButtonContainer>
      </WrapSection>
      {(careerProfile.method === '대면' ||
        careerProfile.method === '모두 선택') && (
        <WrapSection>
          <div className="title">희망 활동 지역</div>
          <Dropdown
            userType="dong"
            placeholder="지역선택"
            list={regionState.list}
            selected={careerProfile.region}
            onSelect={(region) =>
              setCareerProfile({ ...careerProfile, region: region })
            }
          />
        </WrapSection>
      )}

      <WrapSection className="last-section">
        <div className="title">희망 금액</div>
        <InputPrice
          name="price"
          onChange={handleOnChange}
          userType={'dong'}
          selected={careerProfile.priceType}
          onClickMethod={(type) =>
            setCareerProfile({
              ...careerProfile,
              priceType: type,
            })
          }
          value={careerProfile.price || -1}
        />
      </WrapSection>

      <PrevNextButton
        leftText={'이전'}
        rightText={'다음'}
        leftDisabled={false}
        rightDisabled={false}
        leftUserType={null}
        rightUserType={'dong'}
        handlePrev={handlePrevButton}
        handleNext={handleNextButton}
      />
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  padding: 1rem 0 2rem 0;
  border-bottom: 1px solid #ebeceb;
  .title {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 500;
    letter-spacing: 0.0275rem;
    margin-bottom: 1rem;
  }

  .sub-title {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 0.5rem;

    margin-top: 1rem;
  }

  &.last-section {
    margin-bottom: 8rem;
    border-bottom: none;
  }
`;

const InputService = styled.input`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
  border-width: 0 0 1px;
  width: 100%;
  margin-top: 0.5rem;
  &::placeholder {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
  }
`;

const MethodButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.3rem;
`;

interface MethodButtonProps {
  $isSelected: boolean;
}

const MethodButton = styled.div<MethodButtonProps>`
  width: 33.3%;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 1rem;
  border: ${({ $isSelected }) =>
    $isSelected
      ? '2px solid var(--Primary-dong, #FF314A)'
      : '1px solid var(--Base-Gray, #8e8e8e)'};

  background: #fff;
  color: ${({ $isSelected }) =>
    $isSelected ? 'var(--Primary-dong, #FF314A)' : 'var(--Base-Black, #000)'};
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
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

export default RegisterProfileConditionPage;
