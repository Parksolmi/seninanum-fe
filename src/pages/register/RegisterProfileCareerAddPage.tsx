import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import useCareerItemState from '../../store/CareerItemState';
import { instance } from '../../api/instance';

const RegisterProfileCareerAddPage = () => {
  const { careers, addCareer } = useCareerItemState();
  const [title, setTitle] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [period, setPeriod] = useState('');
  const [content, setContent] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'startYear') setStartYear(Number(value));
    if (name === 'startMonth') setStartMonth(Number(value));
    if (name === 'endYear') setEndYear(Number(value));
    if (name === 'endMonth') setEndMonth(Number(value));
    if (name === 'period') setPeriod(value);
    if (name === 'content') setContent(value);
  };

  const addNewCareer = async () => {
    const newCareer = {
      id: careers.length > 0 ? careers[careers.length - 1].id + 1 : 1,
      title,
      startYear,
      startMonth,
      endYear,
      endMonth,
      period,
      content,
    };
    try {
      await instance.post('/register/career/add', newCareer);
      addCareer(newCareer);
      window.alert('등록되었습니다.');
      navigate('/register/profile/career');
    } catch (error) {
      console.error('Failed to add career', error);
    }
  };

  const navigate = useNavigate();
  const navigateToRegisterProfile = () => {
    navigate('/register/profile/career');
  };

  return (
    <WrapContent>
      <WrapCloseIcon>
        <ClosePage
          src="/assets/common/page-close.svg"
          onClick={navigateToRegisterProfile}
        ></ClosePage>
      </WrapCloseIcon>
      <div>
        <CategoryText>회사명</CategoryText>
        <Input
          inputPlaceholder="회사명을 입력하세요."
          onChange={handleOnChange}
          maxLength={50}
        ></Input>
        <CategoryText>근무기간</CategoryText>
        <YearText>입사연월</YearText>
        <InputArea>
          <InputYearMonthText
            type="number"
            placeholder="YYYY"
            onChange={handleOnChange}
          ></InputYearMonthText>
          <InputAreaText>년</InputAreaText>
          <InputYearMonthText
            type="number"
            placeholder="MM"
            onChange={handleOnChange}
          ></InputYearMonthText>
          <InputAreaText>월</InputAreaText>
        </InputArea>
        <YearText>퇴사연월</YearText>
        <InputArea>
          <InputYearMonthText
            type="number"
            placeholder="YYYY"
            onChange={handleOnChange}
          ></InputYearMonthText>
          <InputAreaText>년</InputAreaText>
          <InputYearMonthText
            type="number"
            placeholder="MM"
            onChange={handleOnChange}
          ></InputYearMonthText>
          <InputAreaText>월</InputAreaText>
        </InputArea>
        <CategoryText>세부 업무 내용</CategoryText>
        <TextArea
          inputPlaceholder="세부 업무를 입력하세요."
          onChange={handleOnChange}
        ></TextArea>
        <WrapButton>
          <Button
            children="등록"
            disabled={false}
            type={'dong'}
            onClick={addNewCareer}
          ></Button>
        </WrapButton>
      </div>
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const WrapCloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ClosePage = styled.img`
  margin-top: 0.4rem;
`;

const CategoryText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.03rem;
  margin-bottom: 1rem;
  white-space: pre-line;
  margin-top: 1.75rem;
`;

const YearText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.0875rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const InputYearMonthText = styled.input`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: 0.5;
  border-width: 0 0 1px;
  width: 25%;

  &::placeholder {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    opacity: 0.5;
  }
`;

const InputAreaText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: 0.5;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
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

export default RegisterProfileCareerAddPage;
