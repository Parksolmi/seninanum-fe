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
    <>
      <ToggleContainer>
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
      </ToggleContainer>
    </>
  );
};

interface ToggleActive {
  $isActive: number;
  $option: string;
}

const ToggleContainer = styled.div`
  display: flex;
  gap: 1rem;
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
  font-size: 1.5rem;
  font-weight: 500;
  border-color: ${({ $isActive }) => ($isActive ? '#FF625D' : 'black')};
  color: ${({ $isActive }) => ($isActive ? 'var(--color-dong)' : 'black')};
  transition: border-color 0.3s, color 0.3s;
`;

export default Toggle;
