import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import BriefProfileCard from '../../components/view/BriefProfileCard';
import { formatDate } from '../../utils/formatDate';
import PrevHeader from '../../components/header/PrevHeader';
import { SyncLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/instance';

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
  createdAt: string;
}

const ViewMyRecruitDetail = () => {
  const navigate = useNavigate();
  const { recruitId } = useParams<{ recruitId: string }>();

  const [recruit, setRecruit] = useState<Recruit | null>(null);

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

      getRecruitDetail();
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
          <WrapContent>
            <PrevHeader
              title={'구인글 조회'}
              navigateTo={'-1'}
              onModify={() => navigate(`/modify/recruit/${recruitId}/field`)}
            />

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
            <div>
              <TitleText>지원자</TitleText>
              <BriefProfileCard
                type="dong"
                gender={'남성'}
                age={'20대'}
                nickname={'동배기'}
              />
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
            <WrapButton>
              <Button
                disabled={false}
                userType={'nari'}
                onClick={handleCloseRecruit}
              >
                마감하기
              </Button>
            </WrapButton>
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
  .last-content {
    margin-bottom: 7rem;
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

const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1.5rem;
  background-color: white;
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
