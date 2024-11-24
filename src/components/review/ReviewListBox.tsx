import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface ReviewListBoxProps {
  userType: string;
  targetId: number;
  scheduleId: number;
  targetNickname: string;
  scheduleDate: string;
  scheduleTime: string;
  schedulePlace: string;
}

const ReviewListBox = ({
  userType,
  targetId,
  scheduleId,
  targetNickname,
  scheduleDate,
  scheduleTime,
  schedulePlace,
}: ReviewListBoxProps) => {
  const navigate = useNavigate();
  const [, month, day] = scheduleDate.split('T')[0].split('-');
  return (
    <>
      <WrapContainer>
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
          <img src={`/assets/review/review-clock-${userType}.svg`} alt="" />
          <p>{scheduleTime}</p>
        </div>
        <div className="display-last">
          <img src={`/assets/review/review-place-${userType}.svg`} alt="" />
          <p>{schedulePlace}</p>
        </div>
        <Button
          children="리뷰 작성하기"
          disabled={false}
          userType={userType}
          isBottom={false}
          onClick={() => navigate(`/register/review/${scheduleId}/${targetId}`)}
        />
      </WrapContainer>
    </>
  );
};

const WrapContainer = styled.div`
  width: 100%;
  padding: 1.3rem 1rem 1.3rem 1rem;
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
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.0375rem;
    padding-left: 0.5rem;
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
  .display-last {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
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

export default ReviewListBox;
