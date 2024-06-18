import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import useCareerItemState from '../../store/CareerItemState';
import { instance } from '../../api/instance';

const RegisterProfileCareerAddPage = () => {
  const navigate = useNavigate();
  const { addCareer } = useCareerItemState();
  const [title, setTitle] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [period, setPeriod] = useState('');
  const [content, setContent] = useState('');

  const addNewCareer = async () => {
    const newCareer = {
      title,
      startYear,
      startMonth,
      endYear,
      endMonth,
      period,
      content,
    };
    try {
      const response = await instance.post('/career/item', newCareer);
      console.log(response.data);
      addCareer({ ...newCareer }); // 서버에서 반환된 새 경력 항목 사용
      window.alert('등록되었습니다.');
      navigate('/register/profile/career');
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
      case 'period':
        setPeriod(value);
        break;
      case 'content':
        setContent(value);
        break;
      default:
        break;
    }
  };

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
