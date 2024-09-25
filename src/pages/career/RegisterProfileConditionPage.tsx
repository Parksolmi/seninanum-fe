import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Category from '../../components/common/Category';
import ageState from './../../constants/ageState';
import categoryState from '../../constants/categoryState';
import InputPrice from '../../components/common/InputPrice';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import regionState from '../../constants/regionState';
import Dropdown from '../../components/common/DropDown';
import { instance } from '../../api/instance';
import Modal from '../../components/common/Modal';
import { useToast } from '../../hooks/useToast';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfileState: {
    progressStep: number;
    age: string;
    field: string;
    service: string;
    method: string;
    region: string;
    priceType: string;
    price: number;
    introduce: string;
  };
  setCareerProfileState: (
    state: Partial<{
      progressStep: number;
      age: string;
      field: string;
      service: string;
      method: string;
      region: string;
      priceType: string;
      price: number;
      introduce: string;
    }>
  ) => void;
  calculateProgress: () => void;
}

const RegisterProfileConditionPage = () => {
  const navigate = useNavigate();
  const {
    setStatus,
    careerProfileState,
    setCareerProfileState,
    calculateProgress,
  } = useOutletContext<OutletContext>();
  const { profileId } = useParams<{ profileId: string }>();

  const [selectedMethod, setSelectedMethod] = useState<string>(
    careerProfileState.method || ''
  );
  const [selectedRegion, setSelectedRegion] = useState<string>(
    careerProfileState.region || ''
  );
  const [selectedAgeTags, setSelectedAgeTags] = useState<string[]>(
    careerProfileState.age ? careerProfileState.age.split(',') : []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    careerProfileState.field ? careerProfileState.field.split(',') : []
  );
  const [selectedPriceType, setSelectedPriceType] = useState(
    careerProfileState.priceType || ''
  );

  const [selectedService, setSelectedService] = useState<string>(
    careerProfileState.service || ''
  );

  const [selectedPrice, setSelectedPrice] = useState<number>(
    careerProfileState.price || -1
  );

  const handleButtonClick = (method: string) => {
    setSelectedMethod(method);
  };

  const { showToast: showSelectionError } = useToast(
    () => <span>분야는 3개까지 선택이 가능합니다.</span>,
    'select-exceed-error',
    'bottom-center'
  );

  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const cancelModal = () => setIsOpenModal(false);
  const confirmModal = () => {
    setSelectedMethod('');
    registerCareer();
    navigate('/home');
  };

  const registerCareer = async () => {
    try {
      calculateProgress();
      await instance.patch('/career', {
        profileId: profileId,
        progressStep: careerProfileState.progressStep,
        age: careerProfileState.age,
        field: careerProfileState.field,
        service: careerProfileState.service,
        method: careerProfileState.method,
        region: careerProfileState.region,
        priceType: careerProfileState.priceType,
        price: careerProfileState.price,
        introduce: careerProfileState.introduce,
      });

      alert('등록되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  const hadnleClickAgeTag = (tag) => {
    setSelectedAgeTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        showSelectionError();
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
    });
  };
  const hadnleClickTag = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        showSelectionError();
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
    });
  };
  // "다음" 버튼 활성화 여부 결정
  const isNextButtonDisabled = () => {
    if (
      (selectedMethod === '대면' || selectedMethod === '모두 선택') &&
      selectedRegion === ''
    ) {
      setIsOpenModal(true); // 지역 선택이 없으면 모달 띄우기
    } else {
      registerCareer();
      navigate('/home');
      setStatus(1);
    }
  };
  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;
    if (name === 'service') {
      setSelectedService(value);
    }
    if (name === 'price') {
      setSelectedPrice(value);
    }
    setCareerProfileState({ [name]: value });
  };
  const navigateToRegisterIntroduction = () => {
    // setStatus(2);
    navigate(`/register/profile/introduction/${profileId}`);
  };

  useEffect(() => {
    setCareerProfileState({
      age: selectedAgeTags.join(','),
      field: selectedTags.join(','),
      service: selectedService,
      region: selectedRegion,
      method: selectedMethod,
      priceType: selectedPriceType,
      price: selectedPrice,
    });
  }, [
    setCareerProfileState,
    selectedAgeTags,
    selectedTags,
    selectedService,
    selectedRegion,
    selectedMethod,
    selectedPriceType,
    selectedPrice,
  ]);
  useEffect(() => {
    setStatus(3);
  }, [setStatus]);
  return (
    <>
      <CategoryText>{`마지막으로,\n희망 조건을 작성해보세요!`}</CategoryText>
      <TagText>희망 연령대</TagText>
      <Category
        label=""
        list={ageState.list}
        type={'dong'}
        selectedTags={selectedAgeTags === null ? [] : selectedAgeTags}
        onClickTag={hadnleClickAgeTag}
      ></Category>
      <LineStyle />
      <TitleText>희망 활동 분야</TitleText>
      <SubText>전문 분야</SubText>
      <LastSubText>최대 3개까지 선택 가능해요.</LastSubText>
      <Category
        label=""
        list={categoryState.list}
        type={'dong'}
        selectedTags={selectedTags}
        onClickTag={hadnleClickTag}
      ></Category>
      <LineStyle />
      <TitleText>
        <div>제공할 서비스</div>
      </TitleText>
      <InputService
        name="service"
        onChange={hadnleOnChagne}
        placeholder="ex. 컨설팅, 맞춤 과외 등"
        value={selectedService}
      ></InputService>
      <LineStyle />
      <TitleText>희망 활동 형태</TitleText>
      <MethodButtonContainer>
        {['대면', '비대면', '모두 선택'].map((method) => (
          <MethodButton
            key={method}
            $isSelected={selectedMethod === method}
            onClick={() => handleButtonClick(method)}
          >
            {method}
          </MethodButton>
        ))}
      </MethodButtonContainer>
      {selectedMethod === '대면' || selectedMethod === '모두 선택' ? (
        <>
          <TitleText>희망 활동 지역</TitleText>
          <Dropdown
            userType="dong"
            placeholder="지역선택"
            list={regionState.list}
            selected={selectedRegion}
            onSelect={setSelectedRegion}
          />
        </>
      ) : (
        ''
      )}
      <LineStyle />
      <TitleText>희망 금액</TitleText>
      <InputPrice
        name="price"
        onChange={hadnleOnChagne}
        userType={'dong'}
        selected={selectedPriceType}
        onClickMethod={setSelectedPriceType}
        value={selectedPrice}
      ></InputPrice>
      <GapButton></GapButton>

      <WrapButtonContainer>
        <WrapButton>
          <Button
            userType={null}
            disabled={false}
            children={'이전'}
            onClick={navigateToRegisterIntroduction}
          ></Button>
          <Button
            userType={'dong'}
            disabled={false}
            children={'등록하기'}
            onClick={isNextButtonDisabled}
          ></Button>
        </WrapButton>
      </WrapButtonContainer>
      <>
        <Modal
          userType={'dong'}
          isOpen={isModalOpen}
          title={'희망 지역을 등록해주세요!'}
          content={`대면서비스를 원하시면 \n희망 지역을 선택해주세요.`}
          cancelText={'취소'}
          confirmText={'이대로 제출하기'}
          confirmModal={confirmModal}
          cancelModal={cancelModal}
        />
      </>
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
  white-space: pre;
`;

const TagText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0.0275rem;
`;

const TitleText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0.0275rem;
  margin-top: 1.56rem;
  margin-bottom: 0.8rem;
`;

const SubText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  div {
    margin-top: 1rem;
  }
`;

const LastSubText = styled.div`
  color: #8e8e8e;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LineStyle = styled.div`
  width: 100%;
  height: 0.625rem;
  border-bottom: 1px solid #ebeceb;
  margin-top: 1.5rem;
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
export default RegisterProfileConditionPage;
