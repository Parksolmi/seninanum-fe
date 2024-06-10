import React from 'react';
import styled from 'styled-components';

interface CareerDetailProps {
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  content: string;
  onDelete: () => void;
}

const CareerDetail = ({
  title,
  startYear,
  startMonth,
  endYear,
  endMonth,
  content,
  onDelete,
}: CareerDetailProps) => {
  // 입사 기간 계산
  const calculatePeriod = (
    startYear: number,
    startMonth: number,
    endYear: number,
    endMonth: number
  ) => {
    let years = endYear - startYear;
    let months = endMonth - startMonth;

    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return `${years}년 ${months}개월`;
  };

  const period = calculatePeriod(startYear, startMonth, endYear, endMonth);
  return (
    <InputContainer>
      <span className="first-div">
        <h1>{title}</h1>
        <span className="delete" onClick={onDelete}>
          삭제하기
        </span>
      </span>
      <div>
        <p>{`${startYear}-${startMonth
          .toString()
          .padStart(2, '0')} ~ ${endYear}-${endMonth
          .toString()
          .padStart(2, '0')}`}</p>
        <p className="total">{period}</p>
      </div>
      {/* 최대 3줄 표시 */}
      <p className="content">{content}</p>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  height: 30%;
  padding: 1rem 0.5rem;
  background-color: rgba(247, 248, 247, 1);
  border-radius: 5px;
  font-weight: 500;

  h1 {
    font-size: 1.3rem;
    font-weight: 700;
  }

  .first-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .delete {
    color: var(--Base-Gray3, var(--Base-Gray, #8e8e8e));
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .total {
      color: var(--Primary-dong);
      font-weight: 600;
    }
  }

  .content {
    font-size: 1.2rem;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 최대 3줄 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default CareerDetail;
