import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import useCareerItemState from '../../store/careerItemState';
import CareerDetail from '../../components/common/CareerDetail';
import useCareerProfileState from '../../store/careerProfileState';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import { useCreateChatRoom } from '../../hooks/useCreateChatRoom';

const ViewProfileDong = () => {
  const navigate = useNavigate();

  const [isProfileButtonClicked, setIsProfileButtonClicked] = useState(false);

  const { careerProfileState } = useCareerProfileState();
  const { careers } = useCareerItemState();
  const { data: user } = useFetchProfile();

  // path에서 opponentid값 가져오기
  const createChatRoom = useCreateChatRoom();

  return (
    <>
      {careerProfileState === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-nari)" />
        </WrapLoader>
      ) : (
        <>
          <PrevHeader title={'프로필 조회'} navigateTo={'/home'} />
          <WrapContent>
            {user && (
              <BriefProfileMultiCard
                type="dong"
                nickname={user.nickname}
                gender={user.gender}
                age={calcAge(user.birthYear)}
                profile={user.profile}
              />
            )}
            <WrapButton>
              <Button
                disabled={false}
                userType={'nari'}
                onClick={() => navigate(`/chatroom/dong`)}
              >
                채팅하기
              </Button>
            </WrapButton>
          </WrapContent>

          <SplitLine />

          <WrapContentSingle>
            <TitleText>분야</TitleText>
            <DetailText>{careerProfileState.field}</DetailText>
          </WrapContentSingle>

          <WrapContentSingle>
            <div className="last-content">
              <TitleText>희망조건</TitleText>
              <ConditionText>
                <tbody>
                  {careerProfileState.method && (
                    <tr>
                      <th>활동방식</th>
                      <td>{careerProfileState.method}</td>
                    </tr>
                  )}

                  {careerProfileState.region && (
                    <tr>
                      <th>활동지역</th>
                      <td>서울시 {careerProfileState.region}</td>
                    </tr>
                  )}
                  {careerProfileState.age && (
                    <tr>
                      <th>선호연령</th>
                      <td>아동,20대 {careerProfileState.age}</td>
                    </tr>
                  )}
                  {careerProfileState.priceType &&
                    careerProfileState.price > 0 && (
                      <tr>
                        <th>급여</th>
                        <td>
                          {careerProfileState.priceType}{' '}
                          {careerProfileState.price}원
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
              />
            ))}
          </WrapContentSingle>
          <WrapContentSingle>
            <TitleText>제공할 서비스</TitleText>
            <DetailText>{careerProfileState.service}</DetailText>
          </WrapContentSingle>
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
  margin: 1.5rem 0;
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

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default ViewProfileDong;
