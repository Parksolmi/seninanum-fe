import React, { useState } from 'react';
import styled from 'styled-components';
import Category from '../../components/common/Category';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import categoryState from '../../constants/categoryState';
import ExitHeader from '../../components/header/ExitHeader';
import Dropdown from '../../components/common/DropDown';
import regionState from '../../constants/regionState';
import ageState from '../../constants/ageState';
import { instance } from '../../api/instance';

const MatchFilterNariPage = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedPriceType, setSelectedPriceType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isDisabled = !!(
    ((selectedMethod === '대면' || selectedMethod === '모두 선택') &&
      !selectedRegion) ||
    (selectedPriceType && (!minPrice || !maxPrice))
  );

  const { showToast: showSelectionError } = useToast(
    () => <span>분야는 3개까지 선택이 가능합니다.</span>,
    'select-exceed-error',
    'bottom-center'
  );

  const { showToast: showAgeSelectionError } = useToast(
    () => <span>연령대는 3개까지 선택이 가능합니다.</span>,
    'select-exceed-error',
    'bottom-center'
  );

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

  const hadnleClickAge = (tag) => {
    setSelectedAges((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        showAgeSelectionError();
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
  };

  const handlePriceTypeClick = (priceType) => {
    setSelectedPriceType(priceType);
  };

  const handleApplyFilter = async () => {
    try {
      const response = await instance.post('/career/filter', {
        field: selectedTags,
        age: selectedAges,
        method: selectedMethod,
        region: selectedRegion,
        priceType: selectedPriceType,
        priceMin: minPrice ? Number(minPrice) : undefined,
        priceMax: maxPrice ? Number(maxPrice) : undefined,
      });

      if (response.status === 200) {
        navigate('/match', { state: { filteredProfiles: response.data } });
      } else {
        throw new Error('Failed to apply filters');
      }
    } catch (error) {
      console.error('Error applying filter', error);
    }
  };

  return (
    <>
      <WrapHeader>
        <ExitBtn>
          <ExitHeader userType={'nari'} navigateTo={'-1'} />
        </ExitBtn>
      </WrapHeader>
      <WrapContent>
        <WrapContentSingle>
          <TitleText>
            분야 설정
            <p>최대 3개까지 선택이 가능해요.</p>
          </TitleText>
          <Category
            list={categoryState.list}
            type={'nari'}
            selectedTags={selectedTags}
            onClickTag={hadnleClickTag}
          ></Category>
        </WrapContentSingle>
        <WrapContentSingle>
          <TitleText>
            희망 연령대 설정
            <p>서비스를 제공받을 연령대로 골라주세요.</p>
          </TitleText>
          <Category
            list={ageState.list}
            type={'nari'}
            selectedTags={selectedAges}
            onClickTag={hadnleClickAge}
          ></Category>
        </WrapContentSingle>
        <WrapContentSingle>
          <TitleText>방식 선택</TitleText>
          <Category
            list={['대면', '비대면', '모두 선택']}
            type={'nari'}
            selectedTags={[selectedMethod]}
            onClickTag={handleMethodClick}
            isSingleSelect
          ></Category>

          {selectedMethod !== '' && selectedMethod !== '비대면' && (
            <RegionSelectArea>
              <Dropdown
                userType="nari"
                placeholder="지역선택"
                list={regionState.list}
                selected={selectedRegion}
                onSelect={setSelectedRegion}
              />
            </RegionSelectArea>
          )}
        </WrapContentSingle>

        <WrapContentSingle>
          <TitleText>희망 가격대</TitleText>
          <Category
            list={['시간당', '건당', '상관없음']}
            type={'nari'}
            selectedTags={[selectedPriceType]}
            onClickTag={handlePriceTypeClick}
          ></Category>
          <InputArea>
            <InputField
              placeholder="최소금액"
              type="number"
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
            />
            <span> ~ </span>
            <InputField
              placeholder="최대금액"
              type="number"
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
            />
          </InputArea>
        </WrapContentSingle>
        <CheckboxContainer>
          <Checkbox
            $isChecked={isChecked}
            onClick={() => setIsChecked((prev) => !prev)}
          />
          <CheckboxText>경력 인증 뱃지가 있는 동백만 보기</CheckboxText>
        </CheckboxContainer>
        <Button
          userType={'nari'}
          disabled={isDisabled}
          children={'적용'}
          onClick={handleApplyFilter}
          isBottom={false}
        ></Button>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem 3rem 1.1rem;

  span {
    display: flex;
    flex-direction: row;
  }
  .checkbox {
    margin-top: 2rem;
    margin-bottom: 1.8rem;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border-radius: 0.4375rem;
    background: #d2d2d2;
  }
  .text {
    margin-top: 2rem;
    margin-bottom: 1.8rem;
    margin-left: 0.5rem;
    color: #414040;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.0375rem;
  }
`;

const WrapHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 9;
  padding: 1.3rem 1.1rem 0 1.1rem;
`;

const ExitBtn = styled.div`
  float: right;
`;

const WrapContentSingle = styled.div`
  margin-bottom: 1.8rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;

  p {
    font-size: 1rem;
    font-family: 'NanumSquare';
    font-weight: 400;
    margin-top: 1rem;
    color: #8e8e8e;
  }
`;

const RegionSelectArea = styled.div`
  margin-top: 1rem;
`;

const InputArea = styled.div`
  display: flex;
  margin-top: 1.5rem;
  width: 80%;

  span {
    font-family: NanumSquare;
    color: #000;
    font-size: 1.125rem;
    font-weight: 400;
    margin-left: 0.6rem;
    padding: 0.2rem 0;
  }
`;

const InputField = styled.input`
  text-align: center;
  padding: 0.2rem 0;
  width: 100%;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
  border-width: 0 0 1px;

  &::placeholder {
    color: #8e8e8e;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.0375rem;
  }
  &:focus {
    outline: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1.8rem;
  cursor: pointer;
`;

const Checkbox = styled.div<{ $isChecked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.4375rem;
  background: ${(props) =>
    props.$isChecked ? 'var(--Nari-1, #FFD111)' : '#d2d2d2'};
  background-image: ${(props) =>
    props.$isChecked ? 'url(/assets/common/checkbox-icon.svg)' : 'none'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;

  &:after {
    content: ${(props) =>
      props.$isChecked ? '/assets/common/checkbox-icon.svg' : ''};
    font-size: 1rem;
  }
`;

const CheckboxText = styled.p`
  margin-left: 0.5rem;
  color: #414040;
  font-family: NanumSquare;
  font-size: 1.25rem;
  letter-spacing: 0.0375rem;
`;

export default MatchFilterNariPage;
