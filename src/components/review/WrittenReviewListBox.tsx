import React from 'react';
import styled from 'styled-components';

interface WrittenReviewListBoxProps {
  userType: string;
  scheduleDate: string;
  targetNickname: string;
  rating1: number | null;
  rating2: number | null;
  content: string | null;
}

const WrittenReviewListBox = ({
  userType,
  scheduleDate,
  targetNickname,
  rating1,
  rating2,
  content,
}: WrittenReviewListBoxProps) => {
  const [, month, day] = scheduleDate.split('T')[0].split('-');
  const ratingLabels = ['최고예요', '좋아요', '별로예요'];
  return (
    <>
      <WrapContainer $userType={userType}>
        <div className="display">
          <CalendarContainer $userType={userType}>
            <span className="month">{month}월</span>
            <span className="day">{day}</span>
          </CalendarContainer>
          <span>{`${targetNickname} ${
            userType === 'dong' ? '나리' : '동백'
          }님`}</span>
        </div>
        <div className="display">
          <div className="rating">
            {userType === 'nari' ? '활동 태도' : '매너 평가'}
          </div>
          <p>{rating1 !== null ? ratingLabels[rating1] : '평가 없음'}</p>
        </div>
        <div className="display">
          <div className="rating">
            {userType === 'nari' ? '전문성' : '협의 내용 준수'}
          </div>
          <p>{rating2 !== null ? ratingLabels[rating2] : '평가 없음'}</p>
        </div>
        <div className="display">
          <div className="content">{content}</div>
        </div>
      </WrapContainer>
    </>
  );
};

interface UserTypeProp {
  $userType: string;
}

const WrapContainer = styled.div<UserTypeProp>`
  width: 100%;
  padding: 1.3rem 1rem 0.3rem 1rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);

  span {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    display: flex;
    color: ${({ $userType }) => ($userType === 'dong' ? '#FF314A' : '#ffaa0e')};
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    padding-left: 1.25rem;
  }
  img {
    min-width: 1.25rem;
    height: 1.25rem;
  }
  .display {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
  }
  .rating {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
  }
  .content {
    color: #8e8e8e;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 0.0375rem;
  }
`;

interface CalendarProp {
  $userType: string;
}

const CalendarContainer = styled.div<CalendarProp>`
  width: 3.0625rem;
  height: 3.9375rem;
  flex-shrink: 0;
  border-radius: 0.4375rem;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  margin-right: 0.8rem;

  .month {
    height: 1.3125rem;
    border-radius: 0.4375rem 0.4375rem 0rem 0rem;
    background: ${({ $userType }) =>
      $userType === 'dong' ? '#ff314a' : '#FFD111'};
    color: #fff;
    text-align: center;
    font-family: NanumSquare;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.0175rem;
  }

  .day {
    position: relative;
    top: 6%;
    color: #000;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

export default WrittenReviewListBox;
