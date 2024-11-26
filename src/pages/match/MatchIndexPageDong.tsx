import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomizedDongCard from '../../components/match/CustomizedDongCard';
import FilterButton from './../../components/home/FilterButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../../api/instance';
import MatchCard from '../../components/match/MatchCard';

interface RecruitCard {
  recruitId?: string;
  title: string;
  method: string;
  region: string;
  field: string;
  content: string;
  isApplicate: number;
}

interface MatchRecruit {
  field: string;
  recommendation: RecruitCard;
}

const MatchIndexPageNari = ({ userType }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [recruitList, setRecruitList] = useState<RecruitCard[]>([]);
  const [matchRecruitList, setMatchRecruitList] = useState<MatchRecruit[]>([]);

  // 필터링 페이지에서 전달된 데이터를 받음
  useEffect(() => {
    if (location.state && location.state.filteredRecruit) {
      // 필터링된 데이터가 있을 경우 그 데이터를 사용
      setRecruitList(location.state.filteredRecruit);
    } else {
      // 필터링된 데이터가 없을 경우 기본 career/list 데이터를 불러옴
      const getRecruitList = async () => {
        try {
          const res = await instance.get('/recruit/list');
          setRecruitList(res.data.reverse());
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getRecruitList();
    }
  }, [location.state]);

  // 맞춤형 동백 추천
  useEffect(() => {
    const handleMatchRecruit = async () => {
      try {
        const res = await instance.get('/match/recruit');
        setMatchRecruitList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleMatchRecruit();
  }, []);

  return (
    <>
      <WrapContentSingle>
        <TitleText>맞춤형 구인글 추천</TitleText>
        {matchRecruitList.length > 0 ? (
          <CustomizedCardArea>
            {matchRecruitList.map((recruit) =>
              recruit.recommendation ? (
                <CustomizedDongCard
                  key={recruit.field}
                  field={recruit.field}
                  title={recruit.recommendation.title}
                  onClick={() =>
                    navigate(
                      `/view/recruit/${recruit.recommendation.recruitId}`
                    )
                  }
                />
              ) : (
                <CustomizedDongCard
                  key={recruit.field}
                  field={recruit.field}
                  isExist={false}
                />
              )
            )}
          </CustomizedCardArea>
        ) : (
          <WrapContent>
            <img src="/assets/character/dong-notfound.png" alt="not found" />
            <div>
              <p>
                경력프로필을 작성하기 전에는 <br />
                맞춤형 동백을 추천받을 수 없어요!
              </p>
            </div>
          </WrapContent>
        )}

        <FilterButton onClick={() => navigate('/match/field')} />
        <WrapDongCards>
          {recruitList.length > 0 ? (
            recruitList.map((recruit) => (
              <MatchCard
                key={recruit.recruitId}
                type={'nari'}
                title={recruit.title}
                content={recruit.content}
                fields={recruit.field.split(',')}
                method={recruit.method}
                region={recruit.region}
                navigateTo={() =>
                  navigate(`/view/recruit/${recruit.recruitId}`)
                }
                isApplicate={recruit.isApplicate === 1 ? true : false}
              />
            ))
          ) : (
            <p>추천할 동백님이 없습니다.</p>
          )}
        </WrapDongCards>
      </WrapContentSingle>
    </>
  );
};

const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.06rem;
  margin-bottom: 1rem;
`;

const CustomizedCardArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

const WrapDongCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  img {
    width: 8rem;
  }

  p {
    color: #393939;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4375rem; /* 127.778% */
    letter-spacing: 0.07875rem;
  }
`;

export default MatchIndexPageNari;
