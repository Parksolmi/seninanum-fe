import styled from 'styled-components';
import React, { useState } from 'react';
import UserTypeButton from '../../components/signin/UserTypeButton';
import Button from '../../components/common/Button';

const ChooseTypePage: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handleButtonClick = (name: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === name ? null : name
    );
  };
  return (
    <>
      <Title>어떤 유형으로 가입하시겠어요?</Title>
      <UserTypeButton
        types="동백"
        isSelected={selectedButton === '동백'}
        onClick={handleButtonClick}
      ></UserTypeButton>
      <UserTypeButton
        types="나리"
        isSelected={selectedButton === '나리'}
        onClick={handleButtonClick}
      ></UserTypeButton>
      <Button type={selectedButton}>다음</Button>
    </>
  );
};
const Title = styled.div`
  margin-top: 5.5rem;
  margin-bottom: 3.5rem;
  color: #000;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.0275rem;
`;

export default ChooseTypePage;
