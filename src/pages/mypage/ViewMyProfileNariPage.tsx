import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import { useNavigate } from 'react-router-dom';
import DetailCard from '../../components/common/DetailCard';
import ReviewRatingBar from '../../components/review/ReviewRatingBar';
import ReviewSummaryCard from '../../components/review/ReviewSummaryCard';
import { calcAge } from '../../utils/calcAge';
import { useFetchMyProfile } from '../../hooks/useFetchProfile';
import { instance } from '../../api/instance';
import { SyncLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query';
import useFetchReviews from '../../hooks/useFetchReviews';

interface Recruit {
  recruitId: number;
  title: string;
  content: string;
  method: string;
  region: string;
  field: string;
}

const ViewMyProfileNariPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useFetchMyProfile();
  const { reviews, ratingCounts, totalReviews } = useFetchReviews();

  const queryClient = useQueryClient();

  const [recruitList, setRecruitList] = useState<Recruit[]>([]);
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['fetchMyProfile'] });
    const fetchRecruitList = async () => {
      try {
        const res = await instance.get('/recruit/mylist');
        setRecruitList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecruitList();
  }, [queryClient]);

  return (
    <>
      <PrevHeader title={'내 프로필'} navigateTo={'/mypage'} />
      <WrapContent>
        {user && (
          <BriefProfileMultiCard
            type="dong"
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
            userType={'nari'}
            // 임시
            onClick={() => navigate(`/update/myinfo`)}
            isBottom={false}
          >
            기본 프로필 수정하기
          </Button>
        </WrapButton>
      </WrapContent>

      <SplitLine />
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
            userType="nari"
            title="활동 매너"
            superGreat={ratingCounts.rating1[2]}
            good={ratingCounts.rating1[1]}
            notGood={ratingCounts.rating1[0]}
          />
          <ReviewRatingBar
            userType="nari"
            title="협의 사항 준수"
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
      <SplitLine />

      <WrapContentSingle>
        <TitleText>
          작성 구인글 <span>{recruitList.length}</span>
        </TitleText>
        {isLoading ? (
          <WrapLoader>
            <SyncLoader color="var(--Primary-nari)" />
          </WrapLoader>
        ) : (
          recruitList.map((recruit) => (
            <DetailCard
              key={recruit.recruitId}
              type="dong"
              title={recruit.title}
              content={recruit.content}
              method={recruit.method}
              region={recruit.region ? recruit.region : ''}
              navigateTo={() =>
                navigate(`/view/myrecruit/${recruit.recruitId}`)
              }
              isMyProfile={true}
            />
          ))
        )}
      </WrapContentSingle>
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

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const ReviewRatingBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.3rem 0;
`;

const WrapReviewSingle = styled.div`
  padding: 0rem 1.1rem;
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
  text-align: start;

  span {
    color: var(--Primary-Deep-nari);
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

export default ViewMyProfileNariPage;
