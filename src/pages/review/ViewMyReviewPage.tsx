import React from 'react';
import PrevHeader from '../../components/header/PrevHeader';
import styled from 'styled-components';
import ReviewRatingBar from '../../components/review/ReviewRatingBar';
import ReviewSummaryCard from '../../components/review/ReviewSummaryCard';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import useFetchReviews from '../../hooks/useFetchReviews';
import { useLocation } from 'react-router-dom';

const ViewMyReviewPage = () => {
  const { data: user } = useFetchUserType();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const profileId = searchParams.get('profileId') || undefined;
  const { reviews, ratingCounts, totalReviews } = useFetchReviews(profileId);
  return (
    <>
      <PrevHeader title={'리뷰 조회'} navigateTo={'-1'} />
      <WrapContent>
        <TitleText $userType={user?.userType || ''}>
          리뷰 <span>{totalReviews}</span>
        </TitleText>
        <ReviewRatingBarWrapper>
          <ReviewRatingBar
            userType={user?.userType || ''}
            title="활동 매너"
            superGreat={ratingCounts.rating1[2]}
            good={ratingCounts.rating1[1]}
            notGood={ratingCounts.rating1[0]}
          />
          <ReviewRatingBar
            userType={user?.userType || ''}
            title="협의 사항 준수"
            superGreat={ratingCounts.rating2[2]}
            good={ratingCounts.rating2[1]}
            notGood={ratingCounts.rating2[0]}
          />
        </ReviewRatingBarWrapper>

        {reviews.map((review) => (
          <ReviewSummaryCard
            key={review.reviewId}
            profile={review.reviewerProfile || '/assets/common/profile.png'}
            nickname={review.reviewerNickname || '익명'}
            content={review.content || '리뷰 내용 없음'}
          />
        ))}
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const TitleText = styled.div<{ $userType: string }>`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 1rem;

  span {
    color: ${(props) => (props.$userType === 'nari' ? '#FFAA0E' : '#FF314A')};
  }
`;

const ReviewRatingBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default ViewMyReviewPage;
