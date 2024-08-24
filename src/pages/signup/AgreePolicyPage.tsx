import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../components/common/CheckBox';
import Button from '../../components/common/Button';
import useUserState from '../../store/UserState';
import { useNavigate } from 'react-router-dom';
import PrevHeader from '../../components/header/PrevHeader';

const AgreePolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const { setUserState, userState } = useUserState();

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

      setUserState({
        agreeAgePolicy: true,
        agreeServicePolicy: true,
        agreeMarketingPolicy: true,
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

    console.log();
  };

  const onClickBtn = () => {
    navigate('/signup/profile');
  };

  // 확인용
  useEffect(() => {
    console.log('사용자 정보 >>>>>>', userState);
  }, [userState]);

  return (
    <WrapContent>
      <PrevHeader title="회원가입" navigateTo={'/signup/usertype'} />
      <Title>이용약관에 동의해주세요.</Title>
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
          label="(선택) 마케팅 수신동의"
          checked={checkboxes.option1}
          onChange={handleSelectChange}
          userType={userState.userType}
        />
      </WrapCheckBox>
      <WrapButton>
        <Button
          disabled={isDisabled}
          userType={userState.userType}
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
const WrapCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SplitLine = styled.div`
  border-top: solid 1px #ebeceb;
`;

export default AgreePolicyPage;
