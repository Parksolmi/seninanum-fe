import React, { useState } from 'react';
import styled from 'styled-components';

interface CategoryProps {
  label?: string;
  list: string[];
  type: 'dong' | 'nari' | null;
  selectedTags: string[];
  onClickTag: (tag: Object) => void;
}

const Category = ({
  label,
  list,
  type,
  selectedTags,
  onClickTag,
}: CategoryProps) => {
  return (
    <>
      <Label>{label}</Label>
      <TagContainer>
        {list.map((tag) => (
          <Tag
            key={tag}
            onClick={() => onClickTag(tag)}
            $isSelected={selectedTags.includes(tag)}
            $type={type}
          >
            {tag}
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

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface TagProps {
  $isSelected: boolean;
  $type: 'dong' | 'nari' | null;
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
  /* transition: border 0.3s ease, color 0.3s ease, font-weight 0.3s ease; */

  ${({ $isSelected, $type }) =>
    $isSelected && $type !== null
      ? $isSelected && $type === 'dong'
        ? `border: 2px solid var(--Primary-dong); 
     color: var(--Primary-dong); 
     font-weight: 700;
    `
        : `
    border: 2px solid var(--Primary-Deep-nari); 
     color: var(--Primary-Deep-nari); 
     font-weight: 700;
    `
      : `border: 1px solid #8e8e8e;`}
`;

export default Category;
