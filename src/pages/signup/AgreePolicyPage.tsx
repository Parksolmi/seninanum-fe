import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../components/common/CheckBox';
import Button from '../../components/common/Button';
import useUserState from '../../store/UserState';
import { useNavigate } from 'react-router-dom';

const AgreePolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const { userState } = useUserState();

  const [checkboxes, setCheckboxes] = useState({
    selectAll: false,
    madatory1: false,
    madatory2: false,
    option1: false,
  });

  const isDisabled =
    checkboxes.selectAll === false ||
    checkboxes.madatory1 === false ||
    checkboxes.madatory2 === false;

  const handleSelectChange = (e) => {
    const { id, checked } = e.target;

    if (id === 'selectAll') {
      setCheckboxes({
        selectAll: checked,
        madatory1: checked,
        madatory2: checked,
        option1: checked,
      });
    } else {
      const newCheckboxes = { ...checkboxes, [id]: checked };
      const allMandatoryChecked =
        newCheckboxes.madatory1 && newCheckboxes.madatory2;
      setCheckboxes({
        ...newCheckboxes,
        selectAll: allMandatoryChecked,
      });
    }
  };

  const onClickBtn = () => {
    navigate('/signup/profile');
  };
  const onClickBackBtn = () => {
    navigate('/signup/userType');
  };

  return (
    <WrapContent>
      <BackButton onClick={onClickBackBtn}>
        <img src="/assets/signIn/back-icon.svg" alt="back" />
      </BackButton>

      <Text1>시니나눔이 처음이시네요!</Text1>
      <Text2>이용약관에 동의해주세요.</Text2>
      <WrapCheckBox>
        <CheckBox
          id="selectAll"
          label="약관에 모두 동의"
          checked={checkboxes.selectAll}
          onChange={handleSelectChange}
          userType={userState.userType}
        />
        <SplitLine />
        <CheckBox
          id="madatory1"
          label="(필수) 만 14세 이상입니다"
          checked={checkboxes.madatory1}
          onChange={handleSelectChange}
          userType={userState.userType}
        />
        <CheckBox
          id="madatory2"
          label="(필수) 이용약관"
          checked={checkboxes.madatory2}
          onChange={handleSelectChange}
          userType={userState.userType}
        />
        <CheckBox
          id="option1"
          label="(선택) 만 14세 이상입니다"
          checked={checkboxes.option1}
          onChange={handleSelectChange}
          userType={userState.userType}
        />
      </WrapCheckBox>
      <WrapButton>
        <Button
          disabled={isDisabled}
          type={userState.userType}
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
const BackButton = styled.div`
  margin-top: 1.81rem;
  img {
    width: 1.5rem;
  }
`;

const Text1 = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
`;
const Text2 = styled.div`
  margin-bottom: 4rem;
  color: var(--Base-Deep-Gray);
  font-size: 1.25rem;
  font-weight: 700;
`;
const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;
const WrapCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SplitLine = styled.div`
  border-top: solid 1px #ebeceb;
`;

export default AgreePolicyPage;
