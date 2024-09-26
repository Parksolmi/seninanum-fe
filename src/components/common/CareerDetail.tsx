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
      <span className="first-div">
        <h1>{title}</h1>
        <img
          src={'/assets/common/cancel-button.png'}
          alt="delete"
          onClick={onDelete}
        />
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

  img {
    width: 1rem;
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
