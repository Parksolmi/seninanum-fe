import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  label: string;
  list: string[];
  onDelete: () => void;
}

const Category = ({ label, list, onDelete }: CategoryProps) => {
  return (
    <>
      <Label>{label}</Label>
      <TagContainer>
        {list.map((item) => (
          <Tag>{item}</Tag>
        ))}
      </TagContainer>
    </>
  );
};

const Label = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.44px;
  margin-bottom: 1rem;
`;
const TagContainer = styled.div`
  display: flex;
  font-weight: 500;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  white-space: nowrap;

  flex: 1 1 calc(33.33% - 10px);
  border-radius: 16px;
  border: 1px solid #8e8e8e;
  height: 55px;
`;

export default Category;
