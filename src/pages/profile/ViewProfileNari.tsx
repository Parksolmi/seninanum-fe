import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import ReviewRatingBar from '../../components/review/ReviewRatingBar';
import ReviewSummaryCard from '../../components/review/ReviewSummaryCard';
import DetailCard from '../../components/common/DetailCard';
import { instance } from '../../api/instance';
import useFetchReviews from '../../hooks/useFetchReviews';

interface RecruitProfile {
  recruitId: number;
  title: string;
  content: string;
  method: string;
  region: string;
  nickname: string;
  gender: string;
  birthyear: string;
  profile: string;
}

const ViewProfileNari = () => {
  const navigate = useNavigate();
  const { profileId } = useParams<{ profileId: string }>();
  //const { data: user, isLoading } = useFetchProfile(profileId);
  const { reviews, ratingCounts, totalReviews } = useFetchReviews(profileId);
  const [recruits, setRecruits] = useState<RecruitProfile[]>([]);

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

  useEffect(() => {
    const fetchRecruit = async () => {
      try {
        const res = await instance.get(`/recruit/others/${profileId}`);
        setRecruits(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecruit();
  }, [profileId]);

  return (
    <>
      {recruits === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-dong)" />
        </WrapLoader>
      ) : (
        <>
          <PrevHeader title={'프로필 조회'} navigateTo={'-1'} />
          {recruits.length > 0 && (
            <WrapContent>
              <BriefProfileMultiCard
                type="nari"
                nickname={recruits[0].nickname}
                gender={recruits[0].gender}
                age={calcAge(recruits[0].birthyear)}
                profile={recruits[0].profile}
              />

              <WrapButton>
                <Button
                  disabled={false}
                  userType={'dong'}
                  onClick={createChatRoom}
                  isBottom={false}
                >
                  채팅하기
                </Button>
              </WrapButton>
            </WrapContent>
          )}

          <SplitLine />

          <WrapReviewSingle>
            <MoreIcon>
              <TitleText>
                다른 동백들의 리뷰 <em>{totalReviews}</em>
              </TitleText>
              <img
                src="/assets/common/right-arrow.svg"
                alt=""
                onClick={() => navigate(`/view/review?profileId=${profileId}`)}
              />
            </MoreIcon>

            <ReviewRatingBarWrapper>
              <ReviewRatingBar
                userType="dong"
                title="활동 매너"
                superGreat={ratingCounts.rating1[2]}
                good={ratingCounts.rating1[1]}
                notGood={ratingCounts.rating1[0]}
              />
              <ReviewRatingBar
                userType="dong"
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

          <SplitThinLine />
          <WrapContentSingle>
            <TitleText>
              작성구인글 <em>{recruits ? recruits.length : 0}</em>
            </TitleText>
            {recruits &&
              recruits.map((recruit, index) => (
                <DetailCard
                  key={index}
                  isMyProfile={true}
                  type="nari"
                  title={recruit.title}
                  content={recruit.content}
                  method={recruit.method}
                  region={recruit.region}
                  navigateTo={() =>
                    navigate(`/view/recruit/${recruit.recruitId}`)
                  }
                />
              ))}
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

const ReviewRatingBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SplitThinLine = styled.div`
  background: #ebeceb;
  height: 0.3rem;
  margin: 1.2rem 0;
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

const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0 1.1rem;
  margin-bottom: 2.5rem;

  .review {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
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

  em {
    color: var(--Primary-dong, #ff314a);
  }
`;

export default ViewProfileNari;
