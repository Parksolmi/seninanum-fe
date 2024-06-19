import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import Category from '../../components/common/Category';
import ageState from './../../constants/ageState';
import categoryState from '../../constants/categoryState';
import InputPrice from '../../components/common/InputPrice';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import regionState from '../../constants/regionState';
import Dropdown from '../../components/common/DropDown';
import useCareerProfileState from '../../store/CareerProfileState';
import { instance } from '../../api/instance';

const RegisterProfileConditionPage = () => {
  const navigate = useNavigate();
  const { careerProfileState, setCareerProfileState } = useCareerProfileState();

  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleButtonClick = (method: string) => {
    setSelectedMethod(method);
  };
  const [selectedAgeTags, setSelectedAgeTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceType, setSelectedPriceType] = useState('');

  const registerCareer = () => {
    try {
      instance.post('/career', {
        introduce: careerProfileState.introduce,
        age: careerProfileState.age,
        field: careerProfileState.field,
        service: careerProfileState.service,
        method: careerProfileState.method,
        region: careerProfileState.region,
        priceType: careerProfileState.priceType,
        price: careerProfileState.price,
      });
      window.alert('등록되었습니다.');
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const hadnleClickAgeTag = (tag) => {
    setSelectedAgeTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        setTimeout(() => {
          toast.error('희망 연령대는 3개까지 선택이 가능합니다.');
        }, 0);
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
        setTimeout(() => {
          toast.error('분야는 3개까지 선택이 가능합니다.');
        }, 0);
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
    });
  };
  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;
    setCareerProfileState({ [name]: value });
  };
  const navigateToRegisterIntroduction = () => {
    navigate('/register/profile/introduction');
  };

  useEffect(() => {
    setCareerProfileState({
      age: selectedAgeTags.join(','),
      field: selectedTags.join(','),
      region: selectedRegion,
      method: selectedMethod,
      priceType: selectedPriceType,
    });
  }, [
    setCareerProfileState,
    selectedAgeTags,
    selectedTags,
    selectedRegion,
    selectedMethod,
    selectedPriceType,
  ]);
  return (
    <WrapContent>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 150,
        }}
        toastOptions={{
          style: {
            fontSize: '16px',
          },
        }}
      />
      <ButtonWrap>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={2} type={'dong'}></ProgressBar>
      <CategoryText>{`마지막으로,\n희망 조건을 작성해보세요!`}</CategoryText>
      <TitleText>희망 연령대</TitleText>
      <Category
        label=""
        list={ageState.list}
        type={'dong'}
        selectedTags={selectedAgeTags}
        onClickTag={hadnleClickAgeTag}
      ></Category>
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
      <SubText>
        <div>제공할 서비스</div>
      </SubText>
      <InputService placeholder="ex. 컨설팅, 맞춤 과외 등"></InputService>
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
      {(selectedMethod === '대면 서비스' || selectedMethod === '모두 선택') && (
        <>
          <TitleText>희망 활동 지역</TitleText>
          <Dropdown
            placeholder="지역선택"
            list={regionState.list}
            selected={selectedRegion}
            onSelect={setSelectedRegion}
          />
        </>
      )}

      <TitleText>희망 금액</TitleText>
      <InputPrice
        name="price"
        onChange={hadnleOnChagne}
        userType={'dong'}
        selected={selectedPriceType}
        onClickMethod={setSelectedPriceType}
      ></InputPrice>
      <GapButton></GapButton>

      <WrapButtonContainer>
        <WrapButton>
          <Button
            type={null}
            disabled={false}
            children={'이전'}
            onClick={navigateToRegisterIntroduction}
          ></Button>
          <Button
            type={'dong'}
            disabled={false}
            children={'다음'}
            onClick={registerCareer}
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
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03rem;
  margin-top: 2rem;
  margin-bottom: 1.56rem;
`;

const TitleText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.0275rem;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
`;

const SubText = styled.div`
  color: var(--Base-Black, #000);
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
  div {
    margin-top: 1rem;
  }
`;

const LastSubText = styled.div`
  color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InputService = styled.input`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: 0.5;
  border-width: 0 0 1px;
  width: 100%;

  &::placeholder {
    color: var(--Base-Gray2, #5b5b5b);
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
