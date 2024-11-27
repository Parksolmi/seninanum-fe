import React, { useState } from 'react';
import PrevHeader from '../../components/header/PrevHeader';
import styled from 'styled-components';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import BriefProfileCard from '../../components/view/BriefProfileCard';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import Button from '../../components/common/Button';
import { instance } from '../../api/instance';

const RegisterNewReview = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();
  const [selectedRating1, setSelectedRating1] = useState<number | null>(null);
  const [selectedRating2, setSelectedRating2] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const { scheduleId, targetId } = useParams<{
    targetId: string;
    scheduleId: string;
  }>();
  const { data: opponentProfile, isLoading } = useFetchProfile(targetId || '');

  const handleRatingClick = (rating: number) => {
    setSelectedRating1(rating);
  };
  const handleRating2Click = (rating: number) => {
    setSelectedRating2(rating);
  };

  const onSubmit = async () => {
    setIsSecret(false);
    try {
      await instance.post('/review', {
        scheduleId,
        targetId,
        rating1: selectedRating1,
        rating2: selectedRating2,
        content,
        isSecret,
      });
      alert('리뷰가 성공적으로 작성되었습니다.');
      navigate('/write/review');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <PrevHeader title={'리뷰 작성'} navigateTo={'-1'} />
      <WrapContent>
        {isLoading ? (
          <WrapLoader>
            <SyncLoader
              color={
                user?.userType === 'dong'
                  ? 'var(--Primary-dong)'
                  : 'var(--Primary-nari)'
              }
            />
          </WrapLoader>
        ) : (
          opponentProfile?.profile && (
            <>
              <QuestionText>{`${
                user?.userType === 'nari' ? '나리' : '동백'
              }님,\n${opponentProfile.nickname} ${
                user?.userType === 'nari' ? '동백' : '나리'
              }님은 어떠셨나요?`}</QuestionText>
              <BriefProfileCard
                type={user?.userType === 'dong' ? 'nari' : 'dong'}
                profile={opponentProfile.profile}
                gender={opponentProfile.gender}
                age={calcAge(opponentProfile.birthYear)}
                nickname={opponentProfile.nickname}
                onClick={() => navigate(`/view/dongprofile/${targetId}`)}
              />
              <SplitLine />
              {/* 평가1 */}
              <Rating>
                <p>{`${
                  user?.userType === 'nari' ? '활동 태도' : '매너 평가'
                }`}</p>
                <span>{`${
                  user?.userType === 'nari'
                    ? '성실하게 활동에 임했나요?'
                    : '매너있게 활동에 임했나요?'
                }`}</span>
                <div className="character-box">
                  {['notgood', 'good', 'supergreat'].map((rating, index) => (
                    <RatingOption
                      key={rating}
                      onClick={() => handleRatingClick(index)}
                      $isActive={selectedRating1 === index}
                      $userType={user?.userType || ''}
                    >
                      <img
                        src={`/assets/review/${user?.userType}-${rating}${
                          selectedRating1 === index ? '-active' : ''
                        }.svg`}
                        alt=""
                      />
                      <p>
                        {rating === 'supergreat'
                          ? '최고예요'
                          : rating === 'good'
                          ? '좋아요'
                          : '별로예요'}
                      </p>
                    </RatingOption>
                  ))}
                </div>
              </Rating>
              <SplitLine />
              {/* 평가2 */}
              <Rating>
                <p>{`${
                  user?.userType === 'nari' ? '전문성' : '협의 내용 준수'
                }`}</p>
                <span>{`${
                  user?.userType === 'nari'
                    ? '해당 분야에 대해 전문성을 갖추었나요?'
                    : '협의된 내용에 대해 잘 지켰나요?'
                }`}</span>
                <div className="character-box">
                  {['notgood', 'good', 'supergreat'].map((rating, index) => (
                    <RatingOption
                      key={rating}
                      onClick={() => handleRating2Click(index)}
                      $isActive={selectedRating2 === index}
                      $userType={user?.userType || ''}
                    >
                      <img
                        src={`/assets/review/${user?.userType}-${rating}${
                          selectedRating2 === index ? '-active' : ''
                        }.svg`}
                        alt=""
                      />
                      <p>
                        {rating === 'supergreat'
                          ? '최고예요'
                          : rating === 'good'
                          ? '좋아요'
                          : '별로예요'}
                      </p>
                    </RatingOption>
                  ))}
                </div>
              </Rating>
              <SplitLine />
              {/* 내용 */}
              <Rating>
                <p>활동경험을 알려주세요!</p>
                <span>남겨주신 경험은 상대방의 프로필에 공개돼요!</span>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="여기에 경험을 남겨주세요."
                />
                <div className="last-content"></div>
              </Rating>
              <Button
                children="완료"
                userType={user?.userType || ''}
                isBottom={false}
                disabled={
                  selectedRating1 === null ||
                  selectedRating2 === null ||
                  !content
                }
                onClick={onSubmit}
              />
            </>
          )
        )}
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
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

const QuestionText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
  white-space: pre;
  margin-bottom: 1.3rem;
`;

const SplitLine = styled.div`
  width: 100%;
  height: 0.1rem;
  background: #ebeceb;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
  }
  span {
    color: #414040;
    font-family: NanumSquare;
    font-size: 1.125rem;
    letter-spacing: 0.03375rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  .character-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;
    div {
      img {
        width: 5.625rem;
        height: 5.3125rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        color: #414040;
        text-align: center;
        font-family: NanumSquare;
        font-size: 1.125rem;
        letter-spacing: 0.03375rem;
      }
    }
  }

  textarea {
    width: 100%;
    height: 9rem;
    border: none;
    border-radius: 0.3125rem;
    background: #f7f8f7;
    padding: 1rem;
    overflow-y: auto;
    box-sizing: border-box;
    outline: none;
    font-family: NanumSquare;
    font-size: 1rem;
    color: #414040;
    line-height: 1.5rem;
    resize: none;
  }

  .last-content {
    margin-bottom: 2rem;
  }
`;

const RatingOption = styled.div<{ $isActive: boolean; $userType: string }>`
  cursor: pointer;
  text-align: center;
  img {
    width: 5.625rem;
    height: 5.3125rem;
    transition: opacity 0.3s ease-in-out;
    opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  }
  p {
    font-family: NanumSquare;
    font-size: 1.125rem;
    letter-spacing: 0.03375rem;
    color: ${(props) =>
      props.$isActive
        ? props.$userType === 'nari'
          ? '#FFAA0E'
          : '#FF314A'
        : '#000'};
    transition: color 0.3s ease-in-out;
  }
`;

export default RegisterNewReview;
