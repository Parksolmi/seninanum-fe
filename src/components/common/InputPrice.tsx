import React, { useState } from 'react';
import styled from 'styled-components';
import Category from './Category';

interface RadioButtonProps {
  name: string;
  userType: 'dong' | 'nari';
  selected: string;
  onChange: (e: any) => void;
  onClickMethod: (method: string) => void;
}
const PRICE_CATEGORY: string[] = ['시간당', '건당'];

const InputPrice: React.FC<RadioButtonProps> = ({
  name,
  userType,
  selected,
  onChange,
  onClickMethod,
}) => {
  return (
    <Wrapper>
      <Container>
        {PRICE_CATEGORY.map((type) => (
          <Tag
            key={type}
            onClick={() => onClickMethod(type)}
            $isSelected={selected === type ? true : false}
            $type={userType}
          >
            {type}
          </Tag>
        ))}
      </Container>
      <InputArea>
        <InputField
          name={name}
          placeholder="희망가격"
          type="number"
          onChange={onChange}
        />
        <span>원</span>
      </InputArea>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
`;

const Container = styled.div`
  display: flex;
  width: 50%;
  gap: 0.5rem;
  flex-direction: row;
`;

interface TagProps {
  $isSelected: boolean;
  $type: 'dong' | 'nari' | null;
  onClick: (tag: string) => void;
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

const InputArea = styled.div`
  display: flex;
  margin-left: 1.2rem;

  span {
    font-size: 1.125rem;
    font-weight: 400;
    margin-left: 0.6rem;
    padding: 0.2rem 0;
  }
`;

const InputField = styled.input`
  text-align: center;
  padding: 0.2rem 0;
  width: 100%;
  font-size: 1.125rem;
  border-width: 0 0 2px;
  border-color: #8e8e8e;

  &::placeholder {
    font-weight: 300;
    line-height: 1rem;
    color: #989898;
  }
  &:focus {
    outline: none;
  }
`;

export default InputPrice;
