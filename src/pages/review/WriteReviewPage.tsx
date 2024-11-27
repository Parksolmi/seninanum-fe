import React, { useEffect, useState } from 'react';
import PrevHeader from '../../components/header/PrevHeader';
import styled from 'styled-components';
import { SyncLoader } from 'react-spinners';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import ReviewListBox from '../../components/review/ReviewListBox';
import WrittenReviewListBox from '../../components/review/WrittenReviewListBox';
import { instance } from '../../api/instance';

interface Review {
  reviewId: number;
  scheduleId: number;
  targetId: number;
  targetNickname: string;
  scheduleDate: string;
  scheduleTime: string;
  schedulePlace: string;
  rating1: number | null;
  rating2: number | null;
  content: string | null;
}

const WriteReviewPage = () => {
  const { data: user } = useFetchUserType();
  const [activeTab, setActiveTab] = useState(1);
  const [writtenReviews, setWrittenReviews] = useState<Review[]>([]);
  const [unwrittenReviews, setUnwrittenReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/review/me');
        setWrittenReviews(response.data.writtenReviews);
        setUnwrittenReviews(response.data.unwrittenReviews);
        setError(null);
      } catch (error) {
        console.error('리뷰 조회 실패:', error);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);
  return (
    <>
      <PrevHeader title={'리뷰 작성'} navigateTo={'/mypage'} />
      <WrapContent>
        {user?.userType && (
          <Tab $userType={user?.userType}>
            <p
              onClick={() => setActiveTab(1)}
              className={activeTab === 1 ? 'active' : ''}
            >
              리뷰 쓰기
            </p>
            <p
              onClick={() => setActiveTab(2)}
              className={activeTab === 2 ? 'active' : ''}
            >
              작성한 리뷰
            </p>
          </Tab>
        )}
        <WrapContentSingle>
          {loading ? (
            <WrapLoader>
              <SyncLoader
                color={
                  user?.userType === 'dong'
                    ? 'var(--Primary-dong)'
                    : 'var(--Primary-nari)'
                }
              />
            </WrapLoader>
          ) : error ? (
            <p>{error}</p>
          ) : user?.userType && activeTab === 1 ? (
            // 리뷰 쓰기 탭
            unwrittenReviews.length > 0 ? (
              unwrittenReviews.map((review) => (
                <ReviewListBox
                  key={review.reviewId}
                  scheduleId={review.scheduleId}
                  targetId={review.targetId}
                  targetNickname={review.targetNickname}
                  scheduleDate={review.scheduleDate}
                  scheduleTime={review.scheduleTime}
                  schedulePlace={review.schedulePlace}
                  userType={user?.userType}
                />
              ))
            ) : (
              <p>등록된 일정이 없습니다.</p>
            )
          ) : // 작성한 리뷰 탭
          user?.userType && writtenReviews.length > 0 ? (
            writtenReviews.map((review) => (
              <WrittenReviewListBox
                key={review.reviewId}
                scheduleDate={review.scheduleDate}
                targetNickname={review.targetNickname}
                rating1={review.rating1}
                rating2={review.rating2}
                content={review.content}
                userType={user?.userType}
              />
            ))
          ) : (
            <p>작성한 리뷰가 없습니다.</p>
          )}
        </WrapContentSingle>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

interface TabProp {
  $userType: string;
}

const Tab = styled.div<TabProp>`
  display: flex;
  margin-top: 0.5rem;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  p {
    color: #414040;
    text-align: center;
    font-size: 1.375rem;
    letter-spacing: 0.0275rem;
    font-family: NanumSquare;
    font-weight: 500;
    position: relative;
    &.active {
      color: ${({ $userType }) =>
        $userType === 'dong' ? '#FF314A' : '#ffaa0e'};

      font-family: NanumSquare;
      font-weight: 700;
    }

    &.active::after {
      content: '';
      display: block;
      width: 7.625rem;
      height: 0.25rem;
      background-color: ${({ $userType }) =>
        $userType === 'dong' ? '#ff314a' : '#ffd111'};
      position: absolute;
      bottom: -0.6rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.8rem;
  margin-bottom: 1.25rem;
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

export default WriteReviewPage;
