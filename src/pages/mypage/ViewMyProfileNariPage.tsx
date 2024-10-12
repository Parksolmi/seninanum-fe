import React from 'react';
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

const ViewMyProfileNariPage = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchMyProfile();

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
          >
            기본 프로필 수정하기
          </Button>
        </WrapButton>
      </WrapContent>

      <SplitLine />
      <WrapContentSingle>
        <TitleText>
          리뷰 <span>2</span>
        </TitleText>
        <ReviewRatingBarWrapper>
          <ReviewRatingBar
            userType="nari"
            title="활동 매너"
            superGreat="6"
            good="0"
            notGood="0"
          />
          <ReviewRatingBar
            userType="nari"
            title="협의 사항 준수"
            superGreat="6"
            good="0"
            notGood="0"
          />
        </ReviewRatingBarWrapper>

        <ReviewSummaryCard />
      </WrapContentSingle>
      <SplitLine />

      <WrapContentSingle>
        <TitleText>
          작성 구인글 <span>2</span>
        </TitleText>
        <DetailCard
          key={1}
          type="dong"
          title={'기후기술 창업대회 공모전 피드백 해주실 전문가 구합니다.'}
          content={
            '환경 문제를 어떻게 하면 기후기술로 녹여낼지가 고민입니다. 격주 수요일 저녁에 만나서 피드백 받는 시간을...'
          }
          method={'대면'}
          region={'강남구'}
          navigateTo={() => navigate(``)}
        />
        <DetailCard
          key={2}
          type="dong"
          title={'기후기술 창업대회 공모전 피드백 해주실 전문가 구합니다.'}
          content={
            '환경 문제를 어떻게 하면 기후기술로 녹여낼지가 고민입니다. 격주 수요일 저녁에 만나서 피드백 받는 시간을...'
          }
          method={'대면'}
          region={'강남구'}
          navigateTo={() => navigate(``)}
        />
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

export default ViewMyProfileNariPage;
