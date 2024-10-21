import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useCareerFilterState from '../../store/careerFilterState';
import InputPrice from '../../components/common/InputPrice';
import { instance } from '../../api/instance';

interface OutletContext {
  setStatus: (status: number) => void;
}

const PriceFilterPage = () => {
  const navigate = useNavigate();
  const { setStatus } = useOutletContext<OutletContext>();
  const { careerFilterState, setCareerFilterState } = useCareerFilterState();

  const [selectedPriceType, setSelectedPriceType] = useState('');
  const [price, setPrice] = useState('');

  // 필수 항목이 없을 때 버튼 비활성화
  const isDisabled = !selectedPriceType || !price;

  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;
    setCareerFilterState({ [name]: value });
    if (name === 'price') {
      setPrice(value);
    }
  };

  const filterCareer = async () => {
    try {
      const res = await instance.post('/career/filter', {
        method: careerFilterState.method.replace('서비스', '').trim(),
        priceType: careerFilterState.priceType,
        price: careerFilterState.price,
        region: careerFilterState.region,
        field: careerFilterState.field,
      });

      // 성공 시 응답 데이터를 가지고 home으로 navigate
      window.alert('등록되었습니다.');
      navigate('/home', { state: { filteredProfiles: res.data } });
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToMethod = () => {
    navigate('/filter/career/method');
  };

  useEffect(() => {
    setCareerFilterState({ priceType: selectedPriceType });
  }, [setCareerFilterState, selectedPriceType]);

  useEffect(() => {
    setStatus(3);
  }, [setStatus]);

  return (
    <>
      <WrapContent>
        <TitleText>{`이제 마지막이에요.\n희망 가격대를 알려주세요!`}</TitleText>
        <SubTitle>2024년 기준 최저시급은 9860원이에요.</SubTitle>
        <InputPrice
          name="price"
          onChange={hadnleOnChagne}
          userType={'nari'}
          selected={selectedPriceType}
          onClickMethod={setSelectedPriceType}
        />
      </WrapContent>

      <WrapButton>
        <Button
          userType={null}
          disabled={false}
          children={'이전'}
          onClick={navigateToMethod}
        ></Button>
        <Button
          userType={'nari'}
          disabled={isDisabled}
          children={'다음'}
          onClick={filterCareer}
        ></Button>
      </WrapButton>
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  padding: 0 1.1rem 3rem 1.1rem;
  overflow-y: auto;
  margin-bottom: 5rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
  white-space: pre;
`;

const SubTitle = styled.span`
  color: #8e8e8e;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`;

const WrapButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1rem;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
  background-color: white;
`;

export default PriceFilterPage;
