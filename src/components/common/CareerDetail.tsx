import React from 'react';
import styled from 'styled-components';

interface CareerDetailInput {
  title: string;
  period: string;
  content: string;
  onDelete: () => void;
}

const CareerDetail = ({
  title,
  period,
  content,
  onDelete,
}: CareerDetailInput) => {
  return (
    <InputContainer>
      <h1>{title}</h1>
      <div>
        <p>{period}</p>
        <p className="total">30년 7개월</p>
      </div>
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
  }
`;

export default CareerDetail;
