import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from './../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
import { instance } from '../../api/instance';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import useCareerItemState from '../../store/CareerItemState';
import CareerDetail from '../../components/common/CareerDetail';

interface Career {
  introduce: string;
  age: string;
  field: string;
  service: string;
  method: string;
  region: string;
  priceType: string;
  price: string;
  nickname: string;
  gender: string;
  birthyear: string;
}

const ViewProfileCareer = () => {
  const navigate = useNavigate();
  const { careers, setCareers } = useCareerItemState();
  const { profileId } = useParams<{ profileId: string }>();

  const [career, setCareer] = useState<Career | null>(null);
  useEffect(() => {
    const getCareerProfile = async () => {
      try {
        const res = await instance.get(`/career/${profileId}`);
        setCareer(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCareerProfile();
  }, [profileId]);
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await instance.get('/career/item/list');
        setCareers(response.data);
      } catch (error) {
        console.error('Failed to fetch careers from server', error);
      }
    };
    fetchCareers();
  }, [setCareers]);
  const onDelete = () => {};
  return (
    <>
      {career === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-nari)" />
        </WrapLoader>
      ) : (
        <>
          <WrapContent>
            <PrevHeader title={'프로필 조회'} navigateTo={'/home'} />
            <BriefProfileMultiCard
              type="dong"
              nickname={career.nickname}
              gender={career.gender}
              age={calcAge(career.birthyear)}
              introduce={career.introduce}
            />
          </WrapContent>
          <SplitLine />
          <WrapContentSingle>
            <TitleText>분야</TitleText>
            <DetailText>{career.field}</DetailText>
          </WrapContentSingle>

          <WrapContentSingle>
            <div className="last-content">
              <TitleText>희망조건</TitleText>
              <ConditionText>
                <tbody>
                  {career.method !== '' && (
                    <tr>
                      <th>활동방식</th>
                      <td>{career.method}</td>
                    </tr>
                  )}

                  {career.region !== '' && (
                    <tr>
                      <th>활동지역</th>
                      <td>서울시 {career.region}</td>
                    </tr>
                  )}
                  {career.age !== '' && (
                    <tr>
                      <th>선호연령</th>
                      <td>아동,20대 {career.age}</td>
                    </tr>
                  )}
                  {(career.priceType !== '' || career.price !== '') && (
                    <tr>
                      <th>급여</th>
                      <td>
                        {career.priceType} {career.price}원
                      </td>
                    </tr>
                  )}
                </tbody>
              </ConditionText>
            </div>
          </WrapContentSingle>
          <WrapContentSingle>
            <TitleText>경력</TitleText>
            {careers.map((career) => (
              <CareerDetail
                key={career.title}
                title={career.title}
                startYear={career.startYear}
                startMonth={career.startMonth}
                endYear={career.endYear}
                endMonth={career.endMonth}
                content={career.content}
                onDelete={() => onDelete}
              />
            ))}
          </WrapContentSingle>
          <WrapContentSingle>
            <TitleText>제공할 서비스</TitleText>
            <DetailText>{career.service}</DetailText>
          </WrapContentSingle>
          <WrapButtonContainer>
            <WrapButton>
              <Button
                disabled={false}
                userType={'nari'}
                // 임시
                onClick={() => navigate('/chat')}
              >
                채팅하기
              </Button>
            </WrapButton>
          </WrapButtonContainer>
          <WrapContentSingle />
        </>
      )}
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.1rem;
  margin-bottom: 1.5rem;
  .last-content {
    margin-bottom: 7rem;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.2rem 0;
`;
const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.1rem;
  margin-bottom: 2.5rem;
`;
const TitleText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;
`;
const DetailText = styled.div`
  color: var(--Base-Deep-Gray, #5b5b5b);
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ConditionText = styled.table`
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;

  th,
  td {
    padding-right: 20px;
    font-family: NanumSquare;
    font-size: 1.25rem;
  }

  th {
    color: #5b5b5b;
    font-weight: 700;
  }

  td {
    font-weight: 400;
  }
`;

const WrapLoader = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default ViewProfileCareer;
