import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import BriefProfileCard from '../../components/view/BriefProfileCard';
import { formatDate } from '../../utils/formatDate';
import PrevHeader from '../../components/header/PrevHeader';
import { SyncLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/instance';
import { calcAge } from '../../utils/calcAge';

interface Recruit {
  title: string;
  content: string;
  nickname: string;
  birthyear: string;
  method: string;
  region: string;
  price: number;
  priceType: string;
  gender: string;
  field: string;
  status: string;
  createdAt: string;
}

interface Applicant {
  profileId: string;
  nickname: string;
  gender: string;
  birthyear: string;
  profile: string;
}
const ViewMyRecruitDetail = () => {
  const navigate = useNavigate();
  const { recruitId } = useParams<{ recruitId: string }>();

  const [recruit, setRecruit] = useState<Recruit | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    if (recruitId) {
      const getRecruitDetail = async () => {
        try {
          const res = await instance.get(`/recruit/mylist/${recruitId}`);
          setRecruit(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const getApplicants = async () => {
        try {
          const res = await instance.get(`application/volunteer/${recruitId}`);
          setApplicants(res.data);
        } catch (error) {
          console.error('지원자 목록 조회 중 오류 발생:', error);
        }
      };

      getRecruitDetail();
      getApplicants();
    }
  }, [recruitId]);

  // 구인글 마감하기
  const handleCloseRecruit = async () => {
    if (!recruitId) return;

    try {
      await instance.post('/recruit/close', { recruitId });
      alert('구인글이 마감되었습니다.');
      navigate('/manage/myrecruit'); // 마감 후 구인글 관리 페이지로 이동
    } catch (error) {
      console.error('Error closing recruit:', error);
      alert('구인글 마감 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {recruit === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-nari)" />
        </WrapLoader>
      ) : (
        <>
          {recruit.status === '모집중' ? (
            <PrevHeader
              title={'구인글 조회'}
              navigateTo={'-1'}
              onModify={() => navigate(`/modify/recruit/${recruitId}/field`)}
            />
          ) : (
            <PrevHeader title={'구인글 조회'} navigateTo={'-1'} />
          )}
          <WrapContent className="first-content">
            <div>
              <TitleText>{recruit.title}</TitleText>
              <ContentText>
                {recruit.content.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </ContentText>
              <UploadTimeText>
                <img src="/assets/common/clock-icon-nari.svg" alt="clock" />
                <p>{formatDate(recruit.createdAt)}</p>
              </UploadTimeText>
            </div>
          </WrapContent>

          <SplitLine />

          <WrapContent>
            <div className="applicant">
              <TitleText>지원자</TitleText>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <BriefProfileCard
                    key={applicant.profileId}
                    type="dong"
                    gender={applicant.gender}
                    age={calcAge(applicant.birthyear)}
                    nickname={applicant.nickname}
                    onClick={() =>
                      navigate(`/view/dongprofile/${applicant.profileId}`)
                    }
                  />
                ))
              ) : (
                <p>지원자가 없습니다.</p>
              )}
            </div>
            <div className="last-content">
              <TitleText>모집조건</TitleText>
              <ConditionText>
                <tbody>
                  <tr>
                    <th>분야</th>
                    <td>{recruit.field}</td>
                  </tr>
                  <tr>
                    <th>활동방식</th>
                    <td>{recruit.method?.replace('서비스', '')}</td>
                  </tr>
                  {recruit.method !== '비대면' && (
                    <tr>
                      <th>활동지역</th>
                      <td>서울시 {recruit.region}</td>
                    </tr>
                  )}
                  <tr>
                    <th>급여</th>
                    <td>
                      {recruit.priceType} {recruit.price}원
                    </td>
                  </tr>
                </tbody>
              </ConditionText>
            </div>
            <WrapButtonContainer>
              <Button
                disabled={recruit.status === '모집중' ? false : true}
                userType={'nari'}
                onClick={handleCloseRecruit}
              >
                {recruit.status === '모집중' ? '마감하기' : '마감된 글입니다'}
              </Button>
            </WrapButtonContainer>
          </WrapContent>
        </>
      )}
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1.1rem;
  margin-bottom: 1.5rem;
  &.first-content {
    margin-top: 1.6rem;
  }
  .last-content {
    margin-bottom: 7rem;
  }
  .applicant {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const TitleText = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.3;
  font-family: NanumSquare;
  margin-bottom: 0.5rem;
`;
const ContentText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-top: 1rem;
`;
const UploadTimeText = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  line-height: 1.5rem;
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

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.2rem 0;
`;

const WrapButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 2.12rem 1.1rem;
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

export default ViewMyRecruitDetail;
