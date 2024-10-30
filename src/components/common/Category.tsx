import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  label?: string;
  list: string[];
  type: 'dong' | 'nari' | null;
  selectedTags: string[];
  onClickTag: (tag: Object) => void;
  isSingleSelect?: boolean; // 단일 선택 여부
}

const Category = ({
  label,
  list,
  type,
  selectedTags,
  onClickTag,
  isSingleSelect = false,
}: CategoryProps) => {
  const handleTagClick = (tag: string) => {
    if (isSingleSelect) {
      onClickTag(tag); // 단일 선택 시에는 선택된 tag를 바로 전달
    } else {
      onClickTag(tag); // 다중 선택 시 기존 로직 유지
    }
  };

  return (
    <>
      <Label>{label}</Label>
      <TagContainer>
        {Array.isArray(selectedTags) &&
          list.map((tag) => (
            <Tag
              key={tag}
              onClick={() => handleTagClick(tag)}
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
    border: 2px solid #FFD111; 
     color: var(--Primary-Deep-nari); 
     font-weight: 700;
    `
      : `border: 1px solid #8e8e8e;`}
`;

export default Category;
