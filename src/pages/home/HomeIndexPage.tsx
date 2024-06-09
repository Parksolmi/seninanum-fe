import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SummaryCard from '../../components/common/SummaryCard';
import CareerProfileProgress from '../../components/home/CareerProfileProgress';
import axios from 'axios';

const HomeIndexPage: React.FC = () => {
  const [userType, setUserType] = useState<string>('dong');

  //test api
  useEffect(() => {
    setUserType('dong');
    axios.get('http://localhost:3001/test');
  }, []);

  return (
    <WrapContent>
      {userType === 'dong' ? (
        <>
          <CareerProfileProgress status={0} />
          <SummaryCard
            type={userType}
            nickname="닉네임"
            age="20대"
            method="비대면"
            content="기후기술 창업대회 공모전 피드백 및 도와주실 전문가 구합니다."
            fields={['교육', '예능', '디지털']}
          />
        </>
      ) : (
        <></>
      )}
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

export default HomeIndexPage;
