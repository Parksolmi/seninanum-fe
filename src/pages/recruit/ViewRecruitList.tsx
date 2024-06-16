import React from 'react';
import styled from 'styled-components';
import Fields from '../../components/common/Fields';
import PrevHeader from '../../components/header/PrevHeader';

const ViewRecruitList = () => {
  return (
    <>
      <WrapContent>
        <PrevHeader title={'구인글 조회'} />
        <Fields list={['예체능', '돌봄', '스포츠']} />
      </WrapContent>
      <SplitLine />
      <WrapContent></WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.1rem;
  margin-bottom: 1.5rem;
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
`;

export default ViewRecruitList;
