import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FieldCard from '../../components/event/FieldCard';
import ExitHeader from '../../components/header/ExitHeader';
import { eventFieldList } from '../../constants/eventFieldList';

const SelectFieldPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <WrapHeader>
        <ExitHeader
          navigateTo="/community"
          userType={'dong'}
          backgroundColor="#f0e0c9"
        />
      </WrapHeader>
      <WrapContent>
        <WrapImage>
          {eventFieldList.map((field) => (
            <ScrollItem key={field.name}>
              <FieldCard color={field.color} field={field.name} />
            </ScrollItem>
          ))}
        </WrapImage>
        <StyledButton
          children="선택"
          onClick={() => navigate('/community/event/draw')}
        />
      </WrapContent>
    </>
  );
};

const WrapHeader = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
`;
const WrapContent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0e0c9;
  padding: 1.3rem 1.1rem;

  display: flex;
  flex-direction: column;
`;
const WrapImage = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: flex-start; /* 스크롤 시작점 */
  align-items: center;
  position: relative;

  overflow-x: auto;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; /* 스크롤바 색상 */
    border-radius: 4px;
  }
`;

const ScrollItem = styled.div`
  display: inline-block; /* 가로로 나열되도록 설정 */
  width: 200px; /* 각 아이템 너비 */
  height: 200px;
  margin-right: 1rem; /* 아이템 간격 */
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 13.4375rem;
  height: 4.25rem;
  flex-shrink: 0;

  color: #fff;
  font-family: 'NanumSquare';
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border-radius: 0.875rem;

  margin: 0 auto;

  background-color: var(--Primary-dong);
`;

export default SelectFieldPage;
