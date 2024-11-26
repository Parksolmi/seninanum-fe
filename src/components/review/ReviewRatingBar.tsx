import React from 'react';
import styled from 'styled-components';

interface reviewRationgProps {
  userType: string;
  title: string;
  superGreat: string;
  good: string;
  notGood: string;
}

const ReviewRatingBar: React.FC<reviewRationgProps> = ({
  userType,
  title,
  superGreat,
  good,
  notGood,
}) => {
  return (
    <ReviewContainer>
      <div>{title}</div>
      <ReviewRatingContainer $userType={userType}>
        <ReviewRatingBox>
          <div>{superGreat}</div>
          <p>최고예요</p>
        </ReviewRatingBox>
        <ReviewRatingBox>
          <div>{good}</div>
          <p>좋아요</p>
        </ReviewRatingBox>
        <ReviewRatingBox>
          <div>{notGood}</div>
          <p>별로예요</p>
        </ReviewRatingBox>
      </ReviewRatingContainer>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  width: 100%;
  height: 3.375rem;
  border-radius: 0.625rem;
  background: #f7f8f7;
  display: flex;
  align-items: center;
  padding: 0.8rem;

  div {
    display: flex;
    height: auto;
    color: #414040;
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

const ReviewRatingBox = styled.div`
  display: 1;
  flex-direction: column;
  text-align: center;
  align-items: center;

  p {
    color: #414040;
    text-align: center;
    font-size: 0.6875rem;
    font-weight: 700;
    margin-top: 0.3rem;
  }
  div {
    text-align: center;
    font-size: 1.25rem;
  }
`;

interface userTypeProps {
  $userType: string;
}
const ReviewRatingContainer = styled.div<userTypeProps>`
  gap: 1.5rem;
  display: flex;
  margin-left: auto;

  /* ReviewRatingBox의 내부 스타일을 한 번에 설정 */
  ${ReviewRatingBox} div {
    color: ${({ $userType }) =>
      $userType === 'dong' ? 'var(--Primary-dong)' : 'var(--Primary-nari)'};
  }
`;

export default ReviewRatingBar;
