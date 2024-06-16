import React from 'react';
import styled from 'styled-components';

interface FieldsProps {
  list: string[];
}
const Fields = ({ list }: FieldsProps) => {
  // const list = ['예체능'];
  const type = 'nari';

  const selectedTags: string[] = [];

  return (
    <>
      <WrapTags>
        {list.map((tag) => (
          <Tag
            key={tag}
            onClick={() => selectedTags.push(tag)}
            $isSelected={selectedTags.includes(tag)}
            $type={type}
          >
            {tag}
          </Tag>
        ))}
      </WrapTags>
    </>
  );
};

const WrapTags = styled.div`
  display: flex;
  justify-content: space-between;
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

  max-width: 30%;

  flex: 1 1 calc(33.33% - 10px);
  padding: 0.5rem 0;
  border-radius: 1.40625rem;
  border: 2px solid #ebeceb;
  background: #fff
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
        : `border: 1px solid #8e8e8e;`};
`;

export default Fields;
