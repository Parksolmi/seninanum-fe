import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import CareerDetail from '../../components/common/CareerDetail';
// import { useCreateChatRoom } from '../../hooks/useCreateChatRoom';
import { instance } from '../../api/instance';
import useFetchReviews from '../../hooks/useFetchReviews';
import ReviewRatingBar from '../../components/review/ReviewRatingBar';
import ReviewSummaryCard from '../../components/review/ReviewSummaryCard';

interface CareerProfile {
  introduce: string;
  age: string;
  field: string;
  service: string;
  method: string;
  region: string;
  priceType: string;
  price: number;
  nickname: string;
  gender: string;
  birthYear: string;
  profile: string;
}

interface CareerItem {
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  content: string;
}

const ViewProfileDong = () => {
  const navigate = useNavigate();

  const { profileId } = useParams<{ profileId: string }>();
  const { reviews, ratingCounts, totalReviews } = useFetchReviews(profileId);
  const [careerProfileState, setCareerProfileState] =
    useState<CareerProfile | null>(null);
  const [careers, setCareers] = useState<CareerItem[]>([]);
  useEffect(() => {
    const fetchProfileProgress = async () => {
      try {
        const res = await instance.get(`/career/${profileId}`);
        setCareerProfileState({
          introduce: res.data.introduce,
          age: res.data.age,
          field: res.data.field,
          service: res.data.service,
          method: res.data.method,
          region: res.data.region,
          priceType: res.data.priceType,
          price: res.data.price,
          nickname: res.data.nickname,
          gender: res.data.gender,
          birthYear: res.data.birthyear,
          profile: res.data.profile,
        });
        setCareers(res.data.careerItems || []);
      } catch (error) {
        console.error('경력 프로필 조회에 실패하였습니다.', error);
      }
    };

    fetchProfileProgress();
  }, [profileId]);

  const createChatRoom = async () => {
    try {
      const res = await instance.post('/chatroom/create', {
        oppProfileId: profileId,
      });
      // console.log(res.data);
      navigate(`/chatroom/${res.data.chatRoomId}`);
    } catch (error) {
      console.log(error);
    }
  };
  // 모든 필드가 비어있는지 체크하는 함수
  const isProfileEmpty = (profile: CareerProfile | null) => {
    if (!profile) return true;
    return (
      !profile.introduce &&
      !profile.age &&
      !profile.field &&
      !profile.service &&
      !profile.method &&
      !profile.region &&
      !profile.priceType &&
      !profile.price &&
      !profile.nickname &&
      !profile.gender &&
      !profile.birthYear
    );
  };

  return (
    <>
      {careerProfileState === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-nari)" />
        </WrapLoader>
      ) : (
        <>
          <PrevHeader title={'프로필 조회'} navigateTo={'-1'} />
          <WrapContent>
            <BriefProfileMultiCard
              type="dong"
              nickname={careerProfileState.nickname}
              gender={
                careerProfileState.gender === 'F' ||
                careerProfileState.gender === '여성'
                  ? '여성'
                  : '남성'
              }
              age={calcAge(careerProfileState.birthYear)}
              profile={careerProfileState.profile}
            />
            <WrapButton>
              <Button
                disabled={false}
                userType={'nari'}
                onClick={createChatRoom}
                isBottom={false}
              >
                채팅하기
              </Button>
            </WrapButton>
          </WrapContent>

          <SplitLine />

          {isProfileEmpty(careerProfileState) ? (
            <WrapContentSingle>
              <DetailText>경력 프로필이 없는 동백입니다.</DetailText>
            </WrapContentSingle>
          ) : (
            <>
              <WrapContentSingle>
                <TitleText>분야</TitleText>
                {careerProfileState.field && (
                  <DetailText>{careerProfileState.field}</DetailText>
                )}
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
                          <td>{careerProfileState.age}</td>
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
                {careers.length > 0
                  ? careers.map((career) => (
                      <CareerDetail
                        key={career.title}
                        title={career.title}
                        startYear={career.startYear}
                        startMonth={career.startMonth}
                        endYear={career.endYear}
                        endMonth={career.endMonth}
                        content={career.content}
                      />
                    ))
                  : ''}
              </WrapContentSingle>

              <WrapContentSingle>
                <TitleText>제공할 서비스</TitleText>
                {careerProfileState.service && (
                  <DetailText>{careerProfileState.service}</DetailText>
                )}
              </WrapContentSingle>
            </>
          )}
          <SplitLine />
          <WrapReviewSingle>
            <MoreIcon>
              <TitleText>
                다른 나리들의 리뷰 <span>{totalReviews}</span>
              </TitleText>
              <img
                src="/assets/common/right-arrow.svg"
                alt=""
                onClick={() => navigate(`/view/review?profileId=${profileId}`)}
              />
            </MoreIcon>

            <ReviewRatingBarWrapper>
              <ReviewRatingBar
                userType="nari"
                title="활동 태도"
                superGreat={ratingCounts.rating1[2]}
                good={ratingCounts.rating1[1]}
                notGood={ratingCounts.rating1[0]}
              />
              <ReviewRatingBar
                userType="nari"
                title="전문성"
                superGreat={ratingCounts.rating2[2]}
                good={ratingCounts.rating2[1]}
                notGood={ratingCounts.rating2[0]}
              />
            </ReviewRatingBarWrapper>

            {/* 리뷰 3개만 렌더링 */}
            {reviews.slice(0, 3).map((review) => (
              <ReviewSummaryCard
                key={review.reviewId}
                profile={review.reviewerProfile || '/assets/common/profile.png'}
                nickname={review.reviewerNickname || '익명'}
                content={review.content || '리뷰 내용 없음'}
              />
            ))}
          </WrapReviewSingle>
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
  font-weight: 700;
  line-height: normal;
  text-align: start;

  span {
    color: var(--Primary-Deep-nari);
  }
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

const WrapReviewSingle = styled.div`
  padding: 0rem 1.1rem;
  margin-bottom: 2rem;
`;

const MoreIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;

  img {
    width: 0.5375rem;
    height: 0.9125rem;
    flex-shrink: 0;
  }
`;

const ReviewRatingBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default ViewProfileDong;
