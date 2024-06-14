import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useCareerStore from '../../store/CareerStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';

const RegisterProfileCareerAddPage = () => {
  const [title, setTitle] = useState('');
  const [startYear, setStartYear] = useState<number>(0);
  const [startMonth, setStartMonth] = useState<number>(0);
  const [endYear, setEndYear] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(0);
  const [content, setContent] = useState('');
  const addCareer = useCareerStore((state) => state.addCareer);
  const navigate = useNavigate();
  const onClick = () => {};
  const onCloseBtnClick = () => {
    navigate('/register/profile/career');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startYear && startMonth && endYear && endMonth) {
      addCareer({
        id: Date.now(),
        title,
        startYear,
        startMonth,
        endYear,
        endMonth,
        content,
      });
      navigate('/register/profile/career');
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };
  return (
    <WrapContent>
      <WrapCloseIcon>
        <ClosePage
          src="/assets/common/page-close.svg"
          onClick={onCloseBtnClick}
        ></ClosePage>
      </WrapCloseIcon>
      <form onSubmit={handleSubmit}>
        <CategoryText>회사명</CategoryText>
        <Input
          inputPlaceholder="회사명을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        ></Input>
        <CategoryText>근무기간</CategoryText>
        <YearText>입사연월</YearText>
        <InputArea>
          <InputYearMonthText
            type="number"
            placeholder="YYYY"
            onChange={(e) => setStartYear(parseInt(e.target.value))}
          ></InputYearMonthText>
          <InputAreaText>년</InputAreaText>
          <InputYearMonthText
            type="number"
            placeholder="MM"
            onChange={(e) => setStartMonth(parseInt(e.target.value))}
          ></InputYearMonthText>
          <InputAreaText>월</InputAreaText>
        </InputArea>
        <YearText>퇴사연월</YearText>
        <InputArea>
          <InputYearMonthText
            type="number"
            placeholder="YYYY"
            onChange={(e) => setEndYear(parseInt(e.target.value))}
          ></InputYearMonthText>
          <InputAreaText>년</InputAreaText>
          <InputYearMonthText
            type="number"
            placeholder="MM"
            onChange={(e) => setEndMonth(parseInt(e.target.value))}
          ></InputYearMonthText>
          <InputAreaText>월</InputAreaText>
        </InputArea>
        <CategoryText>세부 업무 내용</CategoryText>
        <TextArea
          inputPlaceholder="세부 업무를 입력하세요."
          onChange={(e) => setContent(e.target.value)}
        ></TextArea>
        <WrapButton>
          <Button
            children="등록"
            disabled={false}
            type={'dong'}
            onClick={onClick}
          ></Button>
        </WrapButton>
      </form>
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
