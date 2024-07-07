import styled from 'styled-components';
import React, { useState } from 'react';
import UserTypeButton from '../../components/signup/UserTypeButton';
import Button from '../../components/common/Button';
import useUserState from '../../store/UserState';
import { useNavigate } from 'react-router-dom';

const ChooseTypePage: React.FC = () => {
  const navigate = useNavigate();

  const { setUserState } = useUserState();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const isDisabled = selectedType === 'null';

  const handleSelectType = (type: string) => {
    setUserState({ userType: type });
    setSelectedType((prevSelected) => (prevSelected === type ? null : type));
  };

  const navigateToPolicy = () => {
    navigate('/signup/policy');
  };

  return (
    <WrapContent>
      <Title>어떤 유형으로 가입하시겠어요?</Title>
      <UserTypeButton
        types="dong"
        isSelected={selectedType === 'dong'}
        onClick={() => handleSelectType('dong')}
      ></UserTypeButton>
      <UserTypeButton
        types="nari"
        isSelected={selectedType === 'nari'}
        onClick={() => handleSelectType('nari')}
      ></UserTypeButton>
      <div></div>
      <WrapButton>
        <Button
          disabled={isDisabled}
          userType={selectedType}
          onClick={navigateToPolicy}
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
