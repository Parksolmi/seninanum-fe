import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import { instance } from '../../api/instance';
import { useNavigate, useParams } from 'react-router-dom';
import useCareerItemState from '../../store/careerItemState';
import useCareerProfileState from '../../store/careerProfileState';
import Button from '../../components/common/Button';
import CareerDetail from '../../components/common/CareerDetail';
import { calcTotalCareer } from '../../utils/calcTotalCareer';
import { calcAge } from '../../utils/calcAge';

const ViewMyProfileDongPage = () => {
  const navigate = useNavigate();
  // GET API 수정 후 profileId 없어질 예정.
  const { profileId } = useParams<{ profileId: string }>();
  const [previousProfileId, setPreviousProfileId] = useState<string | null>(
    null
  );
  const { careerProfileState, setCareerProfileState } = useCareerProfileState();
  const { careers, setCareers } = useCareerItemState();
  const [userState, setUserState] = useState({
    nickname: '',
    gender: '',
    birthYear: '',
    profile: '',
  });

  // 기본 정보 조회 api 호출
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get(`/user/profile`);
        setUserState({
          nickname: res.data[0].nickname,
          gender: res.data[0].gender,
          birthYear: res.data[0].birthYear,
          profile: res.data[0].profile,
        });
      } catch (err) {
        console.error('기본정보 조회에 실패하였습니다.');
      }
    };
    fetchProfile();
  }, [setUserState]);

  useEffect(() => {
    // 이전 profileId와 다를 때만 api 호출
    if (profileId && profileId !== previousProfileId) {
      const fetchProfileProgress = async () => {
        try {
          const response = await instance.get(`/career/${profileId}`);
          setCareerProfileState(response.data);
          setPreviousProfileId(profileId);
        } catch (error) {
          console.error('경력 프로필 조회에 실패하였습니다.', error);
        }
      };

      fetchProfileProgress();
    }
  }, [profileId, previousProfileId, setCareerProfileState]);

  // 경력 항목 조회 함수
  useEffect(() => {
    const fetchCareerItems = async () => {
      try {
        const response = await instance.get(`/career/item/list/${profileId}`);
        setCareers(response.data);
      } catch (error) {
        console.error('경력 항목 조회 중 에러가 발생했습니다.', error);
      }
    };

    fetchCareerItems();
  }, [profileId, setCareers]);

  return (
    <>
      <WrapContent>
        <PrevHeader title={'내 프로필 보기'} navigateTo={'/mypage'} />
        <BriefProfileMultiCard
          type="nari"
          nickname={userState.nickname}
          gender={userState.gender === '여성' ? 'F' : 'M'}
          age={calcAge(userState.birthYear)}
          profile={userState.profile}
          isMyProfile={true}
        />
        <WrapButton>
          <Button
            disabled={false}
            userType={'dong'}
            // 임시
            onClick={() => navigate(`/update/myinfo`)}
          >
            기본 프로필 수정하기
          </Button>
        </WrapButton>
      </WrapContent>

      <SplitLine />

      <WrapContentSingle>
        <TitleText>소개 한마디</TitleText>
        <DetailText>"{careerProfileState.introduce}"</DetailText>
      </WrapContentSingle>

      <WrapContentSingle>
        <TitleText>분야</TitleText>
        <DetailText>{careerProfileState.field}</DetailText>
      </WrapContentSingle>

      <WrapContentSingle>
        <TitleText>희망조건</TitleText>
        <ConditionText>
          <tbody>
            {careerProfileState.method !== '' && (
              <tr>
                <th>활동방식</th>
                <td>{careerProfileState.method}</td>
              </tr>
            )}

            {careerProfileState.region !== '' && (
              <tr>
                <th>활동지역</th>
                <td>서울시 {careerProfileState.region}</td>
              </tr>
            )}
            {careerProfileState.age !== '' && (
              <tr>
                <th>선호연령</th>
                <td>{careerProfileState.age}</td>
              </tr>
            )}
            {(careerProfileState.priceType !== '' ||
              careerProfileState.price > 0) && (
              <tr>
                <th>급여</th>
                <td>
                  {careerProfileState.priceType} {careerProfileState.price}원
                </td>
              </tr>
            )}
          </tbody>
        </ConditionText>
      </WrapContentSingle>

      <WrapContentSingle>
        <CareerItemArea>
          <TitleText>경력</TitleText>
          {careerProfileState.certificate === '승인' && (
            <img
              src="/assets/common/certification-mark-dong.svg"
              alt="확인마크"
            />
          )}
        </CareerItemArea>
        <TotalCareer>
          <img src="/assets/home/career-profile-dong.svg" alt="프로필이미지" />
          <p>총 경력 {calcTotalCareer(careers)}</p>
        </TotalCareer>
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

      <WrapContent>
        <WrapButton>
          <Button
            disabled={false}
            userType={'dong'}
            // 임시
            onClick={() => navigate(`/register/profile/career/${profileId}`)}
          >
            경력 프로필 수정하기
          </Button>
        </WrapButton>
      </WrapContent>

      <WrapContentSingle />
    </>
  );
};
const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.1rem;
  margin-bottom: 1.5rem;
  .last-content {
    margin-bottom: 7rem;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.3rem 0;
`;

const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.1rem;
  margin-bottom: 2.5rem;
`;

const TotalCareer = styled.div`
  display: flex;
  flex-direction: row;

  p {
    color: var(--Primary-dong);
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 600;
    padding: 0.3rem 0 0 0.5rem;
  }
`;

const CareerItemArea = styled.div`
  display: flex;
  flex-direction: row;

  img {
    margin-left: 0.5rem;
  }
`;

const TitleText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: start;
`;

const DetailText = styled.div`
  color: var(--Base-Deep-Gray, #5b5b5b);
  font-family: NanumSquare;
  font-size: 1.25rem;
`;

const ConditionText = styled.table`
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;

  tr th,
  td {
    font-family: NanumSquare;
    font-size: 1.25rem;
  }

  th {
    color: var(--Base-Deep-Gray, #5b5b5b);
  }

  td {
    font-weight: 400;
  }
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export default ViewMyProfileDongPage;
