import styled from 'styled-components';
import React, { useState } from 'react';
import UserTypeButton from '../../components/signup/UserTypeButton';
import Button from '../../components/common/Button';
import useUserState from '../../store/UserState';
import { useNavigate } from 'react-router-dom';
import PrevHeader from '../../components/header/PrevHeader';

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
      <PrevHeader title="회원가입" />
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
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-family: 'NanumSquareR';
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: 0.0275rem;
`;
const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;

export default ChooseTypePage;
