import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SummaryCard from '../../components/common/SummaryCard';
import FilterButton from '../../components/home/FilterButton';

const MatchIndexPageNari = ({ userType }) => {
  const navigate = useNavigate();

  //1.맞춤형추천, 2.지원자목록
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Tab>
        <p
          onClick={() => setActiveTab(1)}
          className={activeTab === 1 ? 'active' : ''}
        >
          맞춤형 추천
        </p>
        <p
          onClick={() => setActiveTab(2)}
          className={activeTab === 2 ? 'active' : ''}
        >
          지원자 목록
        </p>
      </Tab>
      <WrapContent>
        {/* <FilterButton onClick={()=>navigate("/"))} /> */}
        <WrapDongCards>
          {/* {profile.length > 0 ? (
            profile.map((profileItem) => (
              <SummaryCard
                key={profileItem.profileId}
                type={CARD_TYPE}
                profile={profileItem.profile}
                fields={profileItem.field ? profileItem.field.split(',') : []}
                nickname={profileItem.nickname}
                content={profileItem.introduce}
                age={profileItem.birthyear}
                gender={
                  profileItem.gender === 'F' || profileItem.gender === '여성'
                    ? '여성'
                    : '남성'
                }
                onClick={() =>
                  navigate(`/view/dongprofile/${profileItem.profileId}`)
                }
              />
            ))
          ) : (
            <p>추천할 동백님이 없습니다.</p>
          )} */}
        </WrapDongCards>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const Tab = styled.div`
  display: flex;
  margin-top: 0.5rem;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  p {
    color: #414040;
    text-align: center;
    font-size: 1.375rem;
    letter-spacing: 0.0275rem;
    font-family: NanumSquare;
    font-weight: 500;
    position: relative;
    &.active {
      color: #ffaa0e;
      font-family: NanumSquare;
      font-weight: 700;
    }

    &.active::after {
      content: '';
      display: block;
      width: 7.625rem;
      height: 0.25rem;
      background-color: #ffaa0e;
      position: absolute;
      bottom: -0.6rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const WrapDongCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;
export default MatchIndexPageNari;
