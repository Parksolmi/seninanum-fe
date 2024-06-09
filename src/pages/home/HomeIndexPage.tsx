import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SummaryCard from '../../components/common/SummaryCard';
import CareerProfileProgress from '../../components/home/CareerProfileProgress';
import axios from 'axios';
import ProgressBar from '../../components/common/ProgressBar';
import InputPrice from '../../components/common/InputPrice';

const HomeIndexPage: React.FC = () => {
  const [userType, setUserType] = useState<string>('dong');

  //test api
  useEffect(() => {
    setUserType('dong');
    axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/test`);
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
          <ProgressBar status={2} type={'dong'} />
          <InputPrice selected={false} buttontype={'dong'} />
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
