import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Category from '../../components/common/Category';
import categoryState from '../../constants/categoryState';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useRecruitState from '../../store/recruitState';
import { useToast } from '../../hooks/useToast';

interface OutletContext {
  setStatus: (status: number) => void;
}

const RegisterRecruitFieldPage = () => {
  const navigate = useNavigate();
  const { setStatus } = useOutletContext<OutletContext>();
  const { recruitState, setRecruitState } = useRecruitState();

  const [selectedTags, setSelectedTags] = useState<string[]>(
    recruitState.recruitId ? recruitState.field.split(',') : []
  );

  const isDisabled = !recruitState.recruitId && selectedTags.length < 1;

  const { showToast: showSelectionError } = useToast(
    () => <span>분야는 3개까지 선택이 가능합니다.</span>,
    'select-exceed-error',
    'bottom-center'
  );

  const hadnleClickTag = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else if (prevTags.length >= 3) {
        showSelectionError();
        return prevTags;
      } else {
        return [...prevTags, tag];
      }
    });
  };

  useEffect(() => {
    setRecruitState({ field: selectedTags.join(',') });
  }, [setRecruitState, selectedTags]);

  useEffect(() => {
    if (setStatus) {
      setTimeout(() => setStatus(1), 0); // 비동기 호출로 렌더링 충돌 방지
    }
  }, [setStatus]);

  return (
    <WrapContent>
      <TitleText>
        어떤 분야의 동백님을 <br /> 찾으시나요?
        <p>분야는 3개까지 선택이 가능합니다.</p>
      </TitleText>
      <Category
        list={categoryState.list}
        type={'nari'}
        selectedTags={
          recruitState.recruitId ? recruitState.field.split(',') : selectedTags
        }
        onClickTag={hadnleClickTag}
      ></Category>
      <WrapButton>
        <Button
          userType={'nari'}
          disabled={isDisabled}
          children={'다음'}
          onClick={() =>
            recruitState.recruitId
              ? navigate(`/modify/recruit/${recruitState.recruitId}/method`)
              : navigate('/register/recruit/method')
          }
        ></Button>
      </WrapButton>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 0 1.1rem 3rem 1.1rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1.56rem;

  p {
    font-size: 1rem;
    font-family: 'NanumSquare';
    font-weight: 400;
    margin-top: 1rem;
  }
`;

const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
`;

export default RegisterRecruitFieldPage;
