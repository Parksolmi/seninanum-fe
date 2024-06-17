import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import DetailCard from '../../components/common/DetailCard';
import Fields from '../../components/common/Fields';
import PrevHeader from '../../components/header/PrevHeader';

const FIELDS = ['교육', '경제', '생활'];
interface Recruit {
  recruitId: number;
  title: string;
  content: string;
  nickname: string;
  birthyear: string;
  method: string;
  region: string;
}

const ViewRecruitList = () => {
  const navigate = useNavigate();
  const [recruitList, setRecruitList] = useState<Recruit[]>([]);

  useEffect(() => {
    const getRecruitList = async () => {
      try {
        const res = await instance.get('/recruit/list');
        setRecruitList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecruitList();
  }, []);

  return (
    <>
      <WrapContent>
        <PrevHeader
          title={'구인글 목록'}
          navigateTo={() => navigate('/home')}
        />
        <Fields list={FIELDS} type={'dong'} />
      </WrapContent>
      <SplitLine />
      <WrapContent>
        {recruitList &&
          recruitList.map((recruit) => (
            <DetailCard
              key={recruit.recruitId}
              type="nari"
              title={recruit.title}
              content={recruit.content}
              nickname={recruit.nickname}
              age={new Date().getFullYear() - parseInt(recruit.birthyear, 10)}
              method={recruit.method}
              region={recruit.region}
            />
          ))}
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
