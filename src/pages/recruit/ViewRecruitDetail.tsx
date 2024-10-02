import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import Button from '../../components/common/Button';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileCard from '../../components/view/BriefProfileCard';
import { SyncLoader } from 'react-spinners';
import { formatDate } from '../../utils/formatDate';
import { calcAge } from '../../utils/calcAge';

interface Recruit {
  title: string;
  content: string;
  nickname: string;
  birthyear: string;
  method: string;
  region: string;
  price: string;
  priceType: string;
  gender: string;
  field: string;
  createdAt: string;
}

const ViewRecruitDetail = () => {
  const navigate = useNavigate();
  const { recruitId } = useParams<{ recruitId: string }>();

  const [recruit, setRecruit] = useState<Recruit | null>(null);

  useEffect(() => {
    if (recruitId) {
      const getRecruitDetail = async () => {
        try {
          const res = await instance.get(`/recruit/${recruitId}`);
          setRecruit(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      getRecruitDetail();
    }
  }, [recruitId]);

  return (
    <>
      {recruit === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-dong)" />
        </WrapLoader>
      ) : (
        <>
          <WrapContent>
            <PrevHeader
              title={'구인글 조회'}
              navigateTo={'/view/recruit/list'}
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
                <img src="/assets/common/clock-icon.svg" alt="clock" />
                <p>{formatDate(recruit.createdAt)}</p>
              </UploadTimeText>
            </div>
          </WrapContent>

          <SplitLine />

          <WrapContent>
            <div>
              <TitleText>작성자</TitleText>
              <BriefProfileCard
                type="nari"
                gender={recruit.gender}
                age={calcAge(recruit.birthyear)}
                nickname={recruit.nickname}
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
                  {recruit.region !== '' && (
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
                userType={'dong'}
                // 임시
                onClick={() => navigate('/chatroom/dong')}
              >
                지원하기
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

export default ViewRecruitDetail;
