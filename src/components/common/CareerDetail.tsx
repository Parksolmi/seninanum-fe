import React from 'react';
import styled from 'styled-components';
import { calcCareerPeroid } from '../../utils/calcCareerPeroid';

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
  const period = calcCareerPeroid(startYear, startMonth, endYear, endMonth);
  return (
    <InputContainer>
      <img
        src={'/assets/common/cancel-button.png'}
        alt="delete"
        onClick={onDelete}
      />
      <h1>{title}</h1>
      <p className="total">{period}</p>
      <p className="period">{`${startYear}-${startMonth
        .toString()
        .padStart(2, '0')} ~ ${endYear}-${endMonth
        .toString()
        .padStart(2, '0')}`}</p>
      <p className="content">{content}</p>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  height: 30%;
  padding: 1rem 0.5rem;
  background-color: rgba(247, 248, 247, 1);
  border-radius: 5px;
  font-weight: 500;
  position: relative;

  img {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1.3rem;
  }

  h1 {
    font-weight: 700;
    font-family: NanumSquare;
    font-size: 1.3rem;
    font-style: normal;
    line-height: normal;
  }

  .total {
    color: var(--Primary-dong);
    font-family: NanumSquare;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .period {
    color: var(--Base-Gray1, #414040);
    font-family: NanumSquare;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .content {
    font-size: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 최대 3줄 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    color: var(--Base-Gray1, #414040);
    font-family: NanumSquare;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-top: 1rem;
  }
`;

export default CareerDetail;
