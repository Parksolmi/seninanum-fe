import React, { useEffect } from 'react';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import CareerDetail from '../../components/common/CareerDetail';
import { calcTotalCareer } from '../../utils/calcTotalCareer';
import { calcAge } from '../../utils/calcAge';
import { useFetchMyProfile } from '../../hooks/useFetchProfile';
import { useFetchCareerProfile } from '../../hooks/useCareerProfile';
import { useQueryClient } from '@tanstack/react-query';
import useFetchReviews from '../../hooks/useFetchReviews';
import ReviewRatingBar from '../../components/review/ReviewRatingBar';
import ReviewSummaryCard from '../../components/review/ReviewSummaryCard';

const ViewMyProfileDongPage = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchMyProfile();
  const { data: careerProfile } = useFetchCareerProfile();
  const { reviews, ratingCounts, totalReviews } = useFetchReviews();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['fetchMyProfile'] });
  }, [queryClient]);

  return (
    <>
      <PrevHeader title={'내 프로필'} navigateTo={'/mypage'} />
      <WrapContent>
        {user && (
          <BriefProfileMultiCard
            type="nari"
            nickname={user.nickname}
            gender={user.gender}
            age={calcAge(user.birthYear)}
            profile={user.profile}
            isMyProfile={true}
          />
        )}
        <WrapButton>
          <Button
            disabled={false}
            userType={'dong'}
            // 임시
            onClick={() => navigate(`/update/myinfo`)}
            isBottom={false}
          >
            기본 프로필 수정하기
          </Button>
        </WrapButton>
      </WrapContent>

      <SplitLine />

      {/* 경력프로필 */}
      {careerProfile && (
        <>
          <WrapContentSingle>
            <TitleText>소개 한마디</TitleText>
            <DetailText>
              {careerProfile.introduce && `"${careerProfile.introduce}"`}
            </DetailText>
          </WrapContentSingle>

          <WrapContentSingle>
            <TitleText>분야</TitleText>
            <DetailText>{careerProfile?.field}</DetailText>
          </WrapContentSingle>

          {careerProfile && (
            <WrapContentSingle>
              <TitleText>희망조건</TitleText>
              <ConditionText>
                <tbody>
                  <tr>
                    <th>활동방식</th>
                    <td>{careerProfile.method}</td>
                  </tr>
                  <tr>
                    <th>활동지역</th>
                    <td>서울시 {careerProfile.region}</td>
                  </tr>
                  <tr>
                    <th>선호연령</th>
                    <td>{careerProfile.age}</td>
                  </tr>
                  {careerProfile.price >= 0 && (
                    <tr>
                      <th>급여</th>
                      <td>
                        {careerProfile.priceType} {careerProfile.price}원
                      </td>
                    </tr>
                  )}
                </tbody>
              </ConditionText>
            </WrapContentSingle>
          )}

          <WrapContentSingle>
            <CareerItemArea>
              <TitleText>경력</TitleText>
              {careerProfile.careerCertificate.name === '승인' && (
                <img
                  src="/assets/common/certification-mark-dong.svg"
                  alt="확인마크"
                />
              )}
            </CareerItemArea>
            <TotalCareer>
              <img
                src="/assets/home/career-profile-dong.svg"
                alt="프로필이미지"
              />
              <p>총 경력 {calcTotalCareer(careerProfile.careerItems)}</p>
            </TotalCareer>
            {careerProfile?.careerItems.map((career) => (
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
            <DetailText>{careerProfile.service}</DetailText>
          </WrapContentSingle>

          <WrapContent>
            <WrapButton>
              <Button
                isBottom={false}
                disabled={false}
                userType={'dong'}
                // 임시
                onClick={() =>
                  navigate(
                    `/register/profile/career/${careerProfile.careerProfileId}`
                  )
                }
              >
                경력 프로필 수정하기
              </Button>
            </WrapButton>
          </WrapContent>
        </>
      )}
      <SplitLine />
      {/* 리뷰 */}
      <WrapReviewSingle>
        <MoreIcon>
          <TitleText>
            리뷰 <span>{totalReviews}</span>
          </TitleText>
          <img
            src="/assets/common/right-arrow.svg"
            alt=""
            onClick={() => navigate('/view/review')}
          />
        </MoreIcon>

        <ReviewRatingBarWrapper>
          <ReviewRatingBar
            userType="dong"
            title="활동 태도"
            superGreat={ratingCounts.rating1[2]}
            good={ratingCounts.rating1[1]}
            notGood={ratingCounts.rating1[0]}
          />
          <ReviewRatingBar
            userType="dong"
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
  );
};
const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.1rem;
  margin: 1.5rem 0;
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

  span {
    color: var(--Primary-dong, #ff314a);
  }
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

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
`;
export default ViewMyProfileDongPage;
