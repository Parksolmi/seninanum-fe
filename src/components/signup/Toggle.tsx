import styled from 'styled-components';
import React, { useState } from 'react';

interface ToggleProps {
  label: string;
  register: any;
  readonly options: string[];
  readonly userType: string | null;
}

const Toggle = ({ label, options, userType, register }: ToggleProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ToggleContainer>
      <Label>{label}</Label>
      <WrapToggle>
        {options.map((option, index) => (
          <ToggleOption key={index}>
            <HiddenRadio
              id={`option-${index}`}
              value={option}
              {...register}
            />
            <RadioLabel
              htmlFor={`option-${index}`}
              $isActive={index === activeIndex}
              onClick={() => handleClick(index)}
              $userType={userType}
            >
              {option}
            </RadioLabel>
          </ToggleOption>
        ))}
      </WrapToggle>
    </ToggleContainer>
  );
};

interface RadioLabelProps {
  $isActive: boolean;
  $userType: string | null;
}

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  font-family: Nanum_Square;
`;

const WrapToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleOption = styled.div`
  display: flex;
  align-items: center;
`;

const RadioLabel = styled.label<RadioLabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid;
  border-radius: 0.8rem;
  width: 100px;
  height: 50px;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;

  border-color: ${({ $isActive, $userType }) =>
    $isActive
      ? $userType === 'dong'
        ? 'var(--Primary-dong)'
        : 'var(--Primary-nari)'
      : 'var(--Base-Deep-Gray)'};
  color: ${({ $isActive, $userType }) =>
    $isActive
      ? $userType === 'dong'
        ? 'var(--Primary-dong)'
        : 'var(--Primary-Deep-nari)'
      : 'var(--Base-Deep-Gray)'};
  transition: border-color 0.3s, color 0.3s;
  cursor: pointer;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

export default Toggle;
