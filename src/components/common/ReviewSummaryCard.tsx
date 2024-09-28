import React from 'react';
import styled from 'styled-components';

const ReviewSummaryCard = () => {
  return (
    <SummaryCardContainer>
      <UserInfoBox>
        <img src="/assets/common/profile.png" alt="profile" />
        <p>닉네임</p>
      </UserInfoBox>
      <ReviewSummaryText>
        동백이 작성한 리뷰입니다. 동백이 작성한 리뷰입니다. 동백이 작성한
        리뷰입니다. 동백이 작성한 리뷰입니다.
      </ReviewSummaryText>
    </SummaryCardContainer>
  );
};

const SummaryCardContainer = styled.div`
  width: 100%;
  height: 6.4375rem;
  border-radius: 0.9375rem;
  background: #fff;
  box-shadow: 0px 1px 6.3px 0px rgba(150, 150, 150, 0.25);
  padding: 0.6rem;
  display: flex;
  align-items: center;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 3.5rem; /* 최소 너비 설정 */

  img {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 2.75rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
  }

  p {
    color: #414040;
    font-size: 1.125rem;
  }
`;

const ReviewSummaryText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-left: 0.4rem;
  overflow: hidden;
  color: #414040;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: 1.125rem;
  font-weight: 600;
`;

export default ReviewSummaryCard;
