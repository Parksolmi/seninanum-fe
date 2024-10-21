import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import Button from '../common/Button';

interface DatePickerModalProps {
  userType: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onClose: () => void;
}

const DatePickerModal = ({
  userType,
  selectedDate,
  onChange,
  onClose,
}: DatePickerModalProps) => {
  const [internalDate, setInternalDate] = useState<Date | null>(selectedDate);
  const getColorByUserType = (userType: string) => {
    switch (userType) {
      case 'dong':
        return '#FF314A';
      case 'nari':
        return '#FFD111';
      default:
        return '#d9d9d9';
    }
  };

  const highlightColor = getColorByUserType(userType);

  const handleDateChange = (date: Date | null) => {
    setInternalDate(date);
  };

  const handleConfirmClick = () => {
    onChange(internalDate);
    onClose();
  };

  return (
    <ModalBackground>
      <CustomBox
        onClick={(e) => e.stopPropagation()}
        $highlightColor={highlightColor}
      >
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={internalDate}
          onChange={handleDateChange}
          minDate={new Date()} //현재보다 이전 날짜는 선택 불가능
          inline
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <>
              <CustomHeader>
                <div
                  className="btn_month btn_month-prev"
                  onClick={decreaseMonth}
                >
                  <img alt="prev" src="/assets/chat/date-picker-arrow.svg" />
                </div>
                <div className="month-day">
                  {date.getFullYear()}년 {date.getMonth() + 1}월
                </div>
                <div
                  className="btn_month btn_month-next"
                  onClick={increaseMonth}
                >
                  <img alt="next" src="/assets/chat/date-picker-arrow.svg" />
                </div>
              </CustomHeader>
              <CloseImg
                src="/assets/common/cancel-button.png"
                alt=""
                onClick={onClose}
              />
            </>
          )}
        />
        <ButtonContainer>
          <Button
            children={'선택'}
            disabled={!internalDate}
            userType={userType}
            onClick={handleConfirmClick} // 선택된 날짜 전달
          />
        </ButtonContainer>
      </CustomBox>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

interface CustomBoxProps {
  $highlightColor: string;
}

const CloseImg = styled.img`
  position: absolute;
  top: 1.7rem;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;
const CustomBox = styled.div<CustomBoxProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  padding-bottom: 1.1rem;
  background-color: #ffffff;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  position: fixed;
  bottom: 0;

  .react-datepicker__month-container {
    width: 100%;
    padding: 0;
  }

  .react-datepicker {
    border-radius: 1.25rem 1.25rem 0rem 0rem;
    border-style: none;
    width: 100%;
    padding-bottom: 2.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
  }

  .react-datepicker__header {
    background-color: #ffffff;
    border-style: none;
  }

  .react-datepicker__day-names {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .react-datepicker__day-name {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8e8e8e;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
  }
  .react-datepicker__week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .react-datepicker__day {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    color: #5b5b5b;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;
  }
  .react-datepicker__day--today {
    border: 2px solid ${({ $highlightColor }) => $highlightColor};
    border-radius: 50%;
    color: ${({ $highlightColor }) => $highlightColor};
    background-color: #ffffff;
  }

  .react-datepicker__day--selected {
    background: ${({ $highlightColor }) => $highlightColor} !important;
    border-radius: 3.3125rem !important;
    color: #ffffff !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
`;

const CustomHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  padding-top: 3.8rem;
  padding-bottom: 2.1rem;
  .btn_month {
    cursor: pointer;
  }

  .month-day {
    color: #414040;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
  }

  .btn_month-prev {
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .btn_month-next {
    transform: rotate(180deg);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;

export default DatePickerModal;
