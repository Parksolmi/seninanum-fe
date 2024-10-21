import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
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
    <>
      <PrevHeader navigateTo={'-1'} />
      <WrapContent>
        <div>
          <CategoryText>회사명</CategoryText>
          <Input
            inputPlaceholder="회사명을 입력하세요."
            onChange={handleOnChange}
            maxLength={50}
            name="title"
          />
          <CategoryText>근무기간</CategoryText>
          <YearText>입사연월</YearText>
          <InputArea>
            <InputYearMonthText
              type="number"
              placeholder="YYYY"
              onChange={handleOnChange}
              name="startYear"
            />
            <InputAreaText>년</InputAreaText>
            <InputYearMonthText
              type="number"
              placeholder="MM"
              onChange={handleOnChange}
              name="startMonth"
            />
            <InputAreaText>월</InputAreaText>
          </InputArea>
          <YearText>퇴사연월</YearText>
          <InputArea>
            <InputYearMonthText
              type="number"
              placeholder="YYYY"
              onChange={handleOnChange}
              name="endYear"
            />
            <InputAreaText>년</InputAreaText>
            <InputYearMonthText
              type="number"
              placeholder="MM"
              onChange={handleOnChange}
              name="endMonth"
            />
            <InputAreaText>월</InputAreaText>
          </InputArea>
          <CategoryText>세부 업무 내용</CategoryText>
          <TextAreaStyle
            name="content"
            placeholder={'세부 업무를 입력하세요'}
            onChange={handleOnChange}
          />
          <GapButton />
          <Button
            userType={'dong'}
            disabled={false}
            children="등록"
            onClick={addNewCareer}
          ></Button>
        </div>
      </WrapContent>
    </>
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
  border-bottom: 2px solid #ccc; /* 기본 상태에서 얇은 회색 밑줄 */
  width: 25%;

  &::placeholder {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 700;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid var(--Primary-dong);
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

const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 15rem;
  display: flex;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  padding-left: 0.8rem;
  padding-top: 1.5rem;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 400;
  &::placeholder {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border: 1.5px solid var(--Primary-dong);
  }
`;

export default RegisterProfileCareerAddPage;
