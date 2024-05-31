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

  const isDisabled = selectedButton === 'null';
  // 페이지 이동
  const onClickBtn = () => {
    // navigate('policy');
    window.location.href = '/signup/policy';
  };

  return (
    <WrapContent>
      <Title>어떤 유형으로 가입하시겠어요?</Title>
      <UserTypeButton
        types="dong"
        isSelected={selectedButton === 'dong'}
        onClick={handleButtonClick}
      ></UserTypeButton>
      <UserTypeButton
        types="nari"
        isSelected={selectedButton === 'nari'}
        onClick={handleButtonClick}
      ></UserTypeButton>
      <div></div>
      <WrapButton>
        <Button
          disabled={isDisabled}
          type={selectedButton}
          onClick={onClickBtn}
        >
          다음
        </Button>
      </WrapButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem;
`;
const Title = styled.div`
  margin-top: 5.5rem;
  margin-bottom: 3.5rem;
  color: #000;
  font-family: Nanum_Square;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.0275rem;
`;
const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;

export default ChooseTypePage;
