import React from 'react';
import styled from 'styled-components';

interface AppointmentProps {
  date: string;
  time: string;
  place: string;
  alertTime: string;
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return `${month}월 ${day}일 (${dayOfWeek})`;
};
const AlertSchedule = ({ date, time, place, alertTime }: AppointmentProps) => {
  return (
    <>
      <ScheduleContainer>
        <p>약속이 공유되었어요.</p>
        <ScheduleInfoBox>
          <img src="/assets/chat/schedule.svg" alt="" />
          <InfoTextArea>
            <p>
              {date ? formatDate(date) : '날짜 정보 없음'}{' '}
              {time || '시간 정보 없음'}
            </p>
            <span>장소 : {place || '장소 정보 없음'}</span>
          </InfoTextArea>
        </ScheduleInfoBox>
        <RewindText>
          <p>약속 {alertTime || '알림 시간 없음'}</p>에 다시 알림 드릴게요!
        </RewindText>
      </ScheduleContainer>
    </>
  );
};

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  height: 10.4375rem;
  background: #e4f4fd;
  margin: 16px;
  padding: 1.1rem;

  p {
    font-family: NanumSquare;
    font-weight: 700;
  }
`;

const ScheduleInfoBox = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  img {
    width: 3.125rem;
    height: 3.125rem;
  }
`;

const InfoTextArea = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.6875rem;
  }
  span {
    font-family: NanumSquare;
    font-size: 1.125rem;
    line-height: 1.6875rem;
    letter-spacing: 0.03375rem;
  }
`;

const RewindText = styled.div`
  margin-top: 0.9rem;
  color: #5b5b5b;
  font-family: NanumSquare;
  line-height: 1.6875rem;
  letter-spacing: 0.03375rem;
  display: flex;
  flex-direction: row;
  p {
    text-decoration-line: underline;
  }
`;

export default AlertSchedule;
