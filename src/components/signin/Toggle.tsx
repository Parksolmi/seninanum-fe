import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface ToggleProps {
  readonly options: string[];
  setState: (value: string) => void;
}

const Toggle = ({ options, setState }: ToggleProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setState(activeIndex === 1 ? 'F' : 'M');
  }, [setState, activeIndex]);

  return (
    <ToggleContainer>
      <Label>성별</Label>
      <WrapToggle>
        {options.map((option, index) => (
          <ToggleOption
            key={index}
            $isActive={index === activeIndex ? 1 : 0}
            $option={option}
            onClick={() => setActiveIndex(index)}
          >
            {option}
          </ToggleOption>
        ))}
      </WrapToggle>
    </ToggleContainer>
  );
};

interface ToggleActive {
  $isActive: number;
  $option: string;
}

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  font-family: NanumSquareB;
`;

const WrapToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleOption = styled.div<ToggleActive>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1.5px solid #d9d9d9;
  border-radius: 0.8rem;
  width: 23%;
  height: 50px;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: NanumSquareB;
  white-space: nowrap;
  border-color: ${({ $isActive }) =>
    $isActive ? 'var(--Primary-dong)' : 'black'};
  color: ${({ $isActive }) => ($isActive ? 'var(--Primary-dong)' : 'black')};
  transition: border-color 0.3s, color 0.3s;
`;

export default Toggle;
