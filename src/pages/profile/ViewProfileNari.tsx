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
                  isFixed={false}
                >
                  채팅하기
                </Button>
              </WrapButton>
            </WrapContent>
          )}

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
              작성구인글 <em>{recruits ? recruits.length : 0}</em>
            </TitleText>
            {recruits &&
              recruits.map((recruit, index) => (
                <DetailCard
                  key={index}
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
