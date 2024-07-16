import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useDetectClose from '../../hooks/useDetectClose';

interface DropdownProps {
  placeholder: string;
  list: string[];
  selected: string;
  onSelect: (region: string) => void;
  userType: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  list,
  selected,
  onSelect,
  userType,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);

  return (
    <WrapDropDown ref={dropdownRef}>
      <Label>
        <p>서울시</p>
      </Label>
      <Label>
        <DropdownButton
          onClick={() => setIsOpen(!isOpen)}
          $isOpen={isOpen}
          $userType={userType}
        >
          {selected || placeholder}
          <img
            src={
              isOpen
                ? '/assets/home/dropup-icon.svg'
                : '/assets/home/dropdown-icon.svg'
            }
            alt="화살표"
          />
        </DropdownButton>

        <DropdownContent>
          {isOpen && (
            <WrapItems>
              {list.map((item) => (
                <DropdownItem
                  key={item}
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  {item}
                </DropdownItem>
              ))}
            </WrapItems>
          )}
        </DropdownContent>
      </Label>
    </WrapDropDown>
  );
};

const WrapDropDown = styled.div`
  display: flex;
`;

const Label = styled.button`
  position: relative;
  background-color: transparent;
  border-color: transparent;

  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const DropdownButton = styled.div<{ $isOpen: boolean; $userType: string }>`
  background-color: #fff;
  color: ${({ $isOpen, $userType }) =>
    $isOpen
      ? $userType === 'nari'
        ? 'var(--Primary-Deep-nari)'
        : 'var(--Primary-dong)'
      : '#000000'};
  font-size: 1.5rem;
  font-weight: 600;
  white-space: nowrap;

  border-bottom: solid 1px #8e8e8e;
  padding: 0.5rem;

  img {
    margin-left: 1rem;
    width: 1.1rem;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 43px;
  left: 0;
  background-color: white;
  overflow: auto;
  max-height: 150px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  z-index: 1;
`;

const WrapItems = styled.div`
  padding: 0 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid #d9d9d9;
  font-size: 1.5rem;
  text-align: left;
  white-space: nowrap;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default Dropdown;
