import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import { instance } from '../../api/instance';
import toast from 'react-hot-toast';
import PrevHeader from '../../components/header/PrevHeader';

const RegisterProfileCareerAddPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [content, setContent] = useState('');
  const location = useLocation();
  const careerProfileId = location.state?.careerProfileId || 0;

  const validatePeriod = () => {
    const startDate = new Date(startYear, startMonth - 1);
    const endDate = new Date(endYear, endMonth - 1);
    return startDate <= endDate;
  };

  const addNewCareer = async () => {
    if (!validatePeriod()) {
      toast.error(
        '기간을 다시 입력해주세요. (입사일이 퇴사일보다 늦을 수 없습니다.)'
      );
      return;
    }
    const newCareer = {
      careerProfileId,
      title,
      startYear,
      startMonth,
      endYear,
      endMonth,
      content,
    };
    try {
      await instance.post('/career/item', newCareer);
      window.alert('등록되었습니다.');
      navigate(-1);
    } catch (error) {
      console.error(
        'Failed to add career',
        error.response ? error.response.data : error.message
      );
      window.alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'startYear':
        setStartYear(Number(value));
        break;
      case 'startMonth':
        setStartMonth(Number(value));
        break;
      case 'endYear':
        setEndYear(Number(value));
        break;
      case 'endMonth':
        setEndMonth(Number(value));
        break;
      case 'content':
        setContent(value);
        break;
      default:
        break;
    }
  };

  return (
    <WrapContent>
      <PrevHeader navigateTo={'-1'} />
      <div>
        <CategoryText>회사명</CategoryText>
        <Input
          inputPlaceholder="회사명을 입력하세요."
          onChange={handleOnChange}
          maxLength={50}
          name="title"
        ></Input>
        <CategoryText>근무기간</CategoryText>
        <YearText>입사연월</YearText>
        <InputArea>
          <InputYearMonthText
            type="number"
            placeholder="YYYY"
            onChange={handleOnChange}
            name="startYear"
          ></InputYearMonthText>
          <InputAreaText>년</InputAreaText>
          <InputYearMonthText
            type="number"
            placeholder="MM"
            onChange={handleOnChange}
            name="startMonth"
          ></InputYearMonthText>
          <InputAreaText>월</InputAreaText>
        </InputArea>
        <YearText>퇴사연월</YearText>
        <InputArea>
          <InputYearMonthText
            type="number"
            placeholder="YYYY"
            onChange={handleOnChange}
            name="endYear"
          ></InputYearMonthText>
          <InputAreaText>년</InputAreaText>
          <InputYearMonthText
            type="number"
            placeholder="MM"
            onChange={handleOnChange}
            name="endMonth"
          ></InputYearMonthText>
          <InputAreaText>월</InputAreaText>
        </InputArea>
        <CategoryText>세부 업무 내용</CategoryText>
        <TextArea
          inputPlaceholder="세부 업무를 입력하세요."
          onChange={handleOnChange}
          name="content"
        ></TextArea>
        <GapButton />
        <WrapButtonContainer>
          <WrapButton>
            <Button
              userType={'dong'}
              disabled={false}
              children="등록"
              onClick={addNewCareer}
            ></Button>
          </WrapButton>
        </WrapButtonContainer>
      </div>
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 0 1.1rem 1.3rem 1.1rem;
`;

const CategoryText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03rem;
  margin-bottom: 1rem;
  white-space: pre-line;
  margin-top: 1.75rem;
`;

const YearText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.0875rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const InputYearMonthText = styled.input`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 700;
  opacity: 0.5;
  border-width: 0 0 1px;
  width: 25%;

  &::placeholder {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 700;
    opacity: 0.5;
  }
`;

const InputAreaText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 700;
  opacity: 0.5;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
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

export default RegisterProfileCareerAddPage;
