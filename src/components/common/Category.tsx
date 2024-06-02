import React, { useState } from 'react';
import styled from 'styled-components';

interface CategoryProps {
  label: string;
  list: string[];
}

const Category = ({ label, list }: CategoryProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <>
      <Label>{label}</Label>
      <TagContainer>
        {list.map((item, index) => (
          <Tag
            key={index}
            onClick={() => {
              setSelectedTags([...selectedTags, item]);
              console.log(item);
            }}
            $isSelected={selectedTags.includes(item)}
          >
            {item}
          </Tag>
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

interface TagProps {
  $isSelected: boolean;
}
const Tag = styled.div<TagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  white-space: nowrap;

  flex: 1 1 calc(33.33% - 10px);
  border-radius: 16px;
  border: 1px solid #8e8e8e;
  height: 55px;
  transition: border 0.3s ease, color 0.3s ease, font-weight 0.3s ease;

  ${({ $isSelected }) =>
    $isSelected &&
    `border: 2px solid var(--Primary-dong); 
     color: var(--Primary-dong); 
     font-weight: 700;
    `}
`;

export default Category;
