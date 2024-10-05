import React from 'react';
import styled from 'styled-components';

interface filterProps {
  onClick: () => void;
}
const FilterButton: React.FC<filterProps> = ({ onClick }) => {
  return (
    <WrapButton onClick={onClick}>
      <img src="/assets/home/filter-icon.svg" alt="filter" />
      <p>상세조건 설정</p>
    </WrapButton>
  );
};

const WrapButton = styled.div`
  display: flex;
  padding: 0.4rem 1rem;
  justify-content: space-between;

  border: 1px solid black;
  border-radius: 16px;
  width: 10rem;

  img {
    width: 1.4rem;
  }
  p {
    font-weight: 600;
  }
`;

export default FilterButton;
