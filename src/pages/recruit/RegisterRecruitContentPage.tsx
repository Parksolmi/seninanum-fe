import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../../components/common/ProgressBar';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import InputPrice from '../../components/common/InputPrice';
import { useNavigate } from 'react-router-dom';
import useRecruitState from '../../store/RecruitState';
import { instance } from '../../api/instance';
import ExitHeader from '../../components/header/ExitHeader';

const RegisterRecruitContentPage = () => {
  const navigate = useNavigate();
  const { recruitState, setRecruitState } = useRecruitState();

  const [inputCount, setInputCount] = useState(0);
  const [selectedPriceType, setSelectedPriceType] = useState('');

  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;

    setInputCount(e.target.value.replace(/<br\s*V?>/gm, '\n').length);
    setRecruitState({ [name]: value });
  };

  const registerRecruit = () => {
    try {
      instance.post('/recruit', {
        title: recruitState.title,
        content: recruitState.content,
        method: recruitState.method,
        priceType: recruitState.priceType,
        price: recruitState.price,
        region: recruitState.region,
        field: recruitState.field,
      });
      window.alert('등록되었습니다.');
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToMethod = () => {
    navigate('/register/recruit/method');
  };

  useEffect(() => {
    setRecruitState({ priceType: selectedPriceType });
  }, [setRecruitState, selectedPriceType]);

  return (
    <WrapContent>
      <ExitHeader navigateTo={'/home'} />
      <ProgressBar status={2} type={'nari'} />
      <TitleText>{`마지막으로,\n내 구인글을 소개해보세요!`}</TitleText>
      <Input
        name="title"
        inputPlaceholder={'제목을 입력하세요.'}
        onChange={hadnleOnChagne}
        maxLength={39}
      ></Input>
      <MaxText>
        <span>{inputCount}</span>
        <span>/40</span>
      </MaxText>
      <TextArea
        name="content"
        inputPlaceholder={'내용을 입력하세요.'}
        onChange={hadnleOnChagne}
      ></TextArea>
      <InputPrice
        name="price"
        onChange={hadnleOnChagne}
        userType={'nari'}
        selected={selectedPriceType}
        onClickMethod={setSelectedPriceType}
      />
      <WrapButton>
        <Button
          type={null}
          disabled={false}
          children={'이전'}
          onClick={navigateToMethod}
        ></Button>
        <Button
          type={'nari'}
          disabled={false}
          children={'다음'}
          onClick={registerRecruit}
        ></Button>
      </WrapButton>
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1.56rem;
`;

const MaxText = styled.span`
  margin-top: 0.6rem;
  display: flex;
  justify-content: right;
  color: #000;
  font-family: NanumSquare;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.6rem;
`;

const WrapButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
  gap: 1rem;
`;

export default RegisterRecruitContentPage;
