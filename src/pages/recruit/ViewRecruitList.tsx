import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DetailCard from '../../components/common/DetailCard';
import Fields from '../../components/common/Fields';
import PrevHeader from '../../components/header/PrevHeader';

const ViewRecruitList = () => {
  const navigate = useNavigate();

  return (
    <>
      <WrapContent>
        <PrevHeader
          title={'구인글 목록'}
          navigateTo={() => navigate('/home')}
        />
        <Fields list={['예체능', '돌봄', '스포츠']} type={'dong'} />
      </WrapContent>
      <SplitLine />

      <WrapContent>
        <DetailCard type="nari" fields={['비대면']} />
      </WrapContent>
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
  margin: 1.2rem 0;
`;

export default ViewRecruitList;
