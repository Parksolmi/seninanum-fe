import React from 'react';
import styled from 'styled-components';
import useFieldState from '../../store/fieldState';

interface FieldsProps {
  list: string[];
  type: 'nari' | 'dong' | null;
}
const Fields = ({ list, type }: FieldsProps) => {
  const { fieldState, setFieldState } = useFieldState();

  return (
    <>
      <WrapTags>
        {list.map((tag, index) => (
          <Tag
            key={tag}
            onClick={() => setFieldState(index)}
            $isSelected={fieldState.field === index}
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
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
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
  background: #fff;
  ${({ $isSelected, $type }) =>
    $isSelected
      ? $type === 'dong'
        ? `
            border: 1px solid var(--Primary-dong);
            background-color: var(--Primary-dong);
            color: white;
            font-weight: 700;
          `
        : `
            border: 1px solid var(--Primary-nari);
            background-color: var(--Primary-nari);
            color: white;
            font-weight: 700;
          `
      : `border: 2px solid #ebeceb;`};
`;

export default Fields;
