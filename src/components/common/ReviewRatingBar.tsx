import React from 'react';
import styled from 'styled-components';

const ReviewRatingBar = () => {
  return (
    <ReviewContainer>
      <div>활동매너</div>
      <ReviewRatingContainer>
        <ReviewRatingBox>
          <div>{1}</div>
          <p>최고예요</p>
        </ReviewRatingBox>
        <ReviewRatingBox>
          <div>{2}</div>
          <p>좋아요</p>
        </ReviewRatingBox>
        <ReviewRatingBox>
          <div>{0}</div>
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

const ReviewRatingContainer = styled.div`
  gap: 1.5rem;
  display: flex;
  margin-left: auto;
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
  }
  div {
    color: #f48400;
    text-align: center;
    font-size: 1.25rem;
  }
`;

export default ReviewRatingBar;
