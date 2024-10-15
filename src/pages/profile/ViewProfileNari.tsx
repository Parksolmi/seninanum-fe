import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import ReviewRatingBar from '../../components/review/ReviewRatingBar';
import ReviewSummaryCard from '../../components/review/ReviewSummaryCard';
import DetailCard from '../../components/common/DetailCard';
import { instance } from '../../api/instance';

const ViewProfileNari = () => {
  const navigate = useNavigate();
  const { profileId } = useParams<{ profileId: string }>();
  const { data: user, isLoading } = useFetchProfile(profileId);

  const createChatRoom = async () => {
    try {
      const res = await instance.post('/chatroom/create', {
        oppProfileId: profileId,
      });
      // console.log(res.data);
      navigate(`/chatroom/dong/${res.data.chatRoomId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-dong)" />
        </WrapLoader>
      ) : (
        <>
          <PrevHeader title={'프로필 조회'} navigateTo={'-1'} />
          <WrapContent>
            {user && (
              <BriefProfileMultiCard
                type="nari"
                nickname={user.nickname}
                gender={user.gender}
                age={calcAge(user.birthYear)}
                profile={user.profile}
              />
            )}
            <WrapButton>
              <Button
                disabled={false}
                userType={'dong'}
                onClick={createChatRoom}
              >
                채팅하기
              </Button>
            </WrapButton>
          </WrapContent>

          <SplitLine />

          <WrapContentSingle>
            <TitleText>
              리뷰 <em>5</em>
            </TitleText>
            <div className="review">
              <ReviewRatingBar
                userType="dong"
                title="활동 매너"
                superGreat="3"
                good="2"
                notGood="0"
              />
              <ReviewRatingBar
                userType="dong"
                title="협의 사항 준수"
                superGreat="3"
                good="2"
                notGood="0"
              />
            </div>
            <div className="review">
              <ReviewSummaryCard />
              <ReviewSummaryCard />
              <ReviewSummaryCard />
            </div>
          </WrapContentSingle>

          <SplitThinLine />
          <WrapContentSingle>
            <TitleText>
              작성구인글 <em>2</em>
            </TitleText>
            <DetailCard
              type="nari"
              title="기후기술 창업대회 공모전 피드백 해주실 전문가 구합니다."
              content="환경 문제를 어떻게 하면 기후기술로 녹여낼지가 고민입니다. 격주 수요일 저녁에 만나서 피드백 받고 싶습니다."
              age="50대"
              method="모두 선택"
              region="서대문구"
              navigateTo={() => navigate('/')}
            />
            <DetailCard
              type="nari"
              title="기후기술 창업대회 공모전 피드백 해주실 전문가 구합니다."
              content="환경 문제를 어떻게 하면 기후기술로 녹여낼지가 고민입니다. 격주 수요일 저녁에 만나서 피드백 받고 싶습니다."
              age="50대"
              method="모두 선택"
              region="서대문구"
              navigateTo={() => navigate('/')}
            />
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
    color: var(--Primary-dong);
  }
`;

export default ViewProfileNari;
