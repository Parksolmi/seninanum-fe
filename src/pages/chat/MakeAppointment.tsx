import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import Category from '../../components/common/Category';
import alertState from '../../constants/alertState';
import Button from '../../components/common/Button';
import DatePickerBottomSheet from '../../components/chat/DatePickerBottomSheet';
import TimePickerBottomSheet from '../../components/chat/TimePickerBottomSheet';

const MakeAppointment = ({ onClose }) => {
  const { data: user } = useFetchUserType();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const hadnleClickTag = (tag) => {
    setSelectedTag(tag);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    const formattedTime = `${time.period} ${time.hour}:${time.minute}`;
    setSelectedTime(formattedTime);
  };
  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  return (
    <>
      {showDatePicker && (
        <DatePickerBottomSheet
          userType={user?.userType}
          selectedDate={selectedDate}
          onChange={handleDateChange}
          onClose={() => setShowDatePicker(false)}
        />
      )}
      {showTimePicker && (
        <TimePickerBottomSheet
          userType={user?.userType}
          selectedTime={selectedTime}
          onChange={handleTimeChange}
          onClose={() => setShowTimePicker(false)}
        />
      )}
      <WrapContent>
        <img
          src="/assets/common/back-icon.svg"
          alt=""
          className="back"
          onClick={() => onClose()}
        />
        <TitleText>
          {`OOO ${user?.userType === 'dong' ? '나리' : '동백'}님과 약속`}
        </TitleText>
        <InputContainer>
          <SingleInputBox>
            <SubtitleText>날짜</SubtitleText>
            <SingleInputArea>
              <p>
                {selectedDate ? selectedDate.toLocaleDateString() : '날짜 선택'}
              </p>
              <img
                src="/assets/common/more-icon.svg"
                alt="달력 아이콘"
                onClick={() => setShowDatePicker(true)}
              />
            </SingleInputArea>
          </SingleInputBox>
          <TimeInputBox>
            <SubtitleText>시간</SubtitleText>
            <SingleInputArea>
              <p>{selectedTime ? selectedTime : '시간 선택'}</p>
              <img
                src="/assets/common/more-icon.svg"
                alt=""
                onClick={() => setShowTimePicker(true)}
              />
            </SingleInputArea>
          </TimeInputBox>
          <SingleInputBox>
            <SubtitleText>장소</SubtitleText>
            <SingleInputArea>
              <input
                type="text"
                placeholder="장소를 입력해주세요."
                value={selectedPlace}
                onChange={handlePlaceChange}
              />
            </SingleInputArea>
          </SingleInputBox>
          <SingleCategorytBox>
            <SubtitleText>약속 전 나에게 알림</SubtitleText>
            <Category
              label=""
              list={alertState.list}
              type={user?.userType === 'dong' ? 'dong' : 'nari'}
              selectedTags={selectedTag ? [selectedTag] : []}
              onClickTag={hadnleClickTag}
            ></Category>
          </SingleCategorytBox>
        </InputContainer>
        <WrapButtonContainer>
          <Button
            disabled={
              !selectedDate || !selectedTime || !selectedTag || !selectedPlace
            }
            userType={user?.userType === 'dong' ? 'dong' : 'nari'}
            onClick={() =>
              console.log(
                selectedDate,
                selectedTime,
                selectedPlace,
                selectedTag
              )
            }
          >
            {'등록하기'}
          </Button>
        </WrapButtonContainer>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.1rem;
  margin: 1.5rem 0;

  .back {
    width: 0.8rem;
    margin-bottom: 2.7rem;
  }
`;

const TitleText = styled.div`
  color: #000;
  font-size: 1.5rem;
  font-weight: 800;
  font-family: NanumSquare;
  margin-bottom: 3rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

const SingleInputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const TimeInputBox = styled(SingleInputBox)`
  margin-bottom: 2rem;
`;

const SubtitleText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 700;
`;

const SingleCategorytBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

const SingleInputArea = styled.div`
  display: flex;
  gap: 1rem;
  p {
    color: #414040;
    text-align: right;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.0375rem;
  }
  img {
    align-items: center;
    transform: rotate(90deg);
  }
  input {
    all: unset;
    box-sizing: border-box;
    color: #414040;
    text-align: right;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.0375rem;
    flex-grow: 1;
  }
`;

const WrapButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 2.12rem 1.1rem;
`;

export default MakeAppointment;
