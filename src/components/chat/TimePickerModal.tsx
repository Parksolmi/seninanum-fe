import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Button from '../common/Button';

const TimePickerModal = ({ userType, selectedTime, onChange, onClose }) => {
  const initialPeriod = selectedTime ? selectedTime.split(' ')[0] : '오전';
  const initialHour = selectedTime
    ? parseInt(selectedTime.split(' ')[1].split(':')[0], 10)
    : 1;
  const initialMinute = selectedTime
    ? parseInt(selectedTime.split(':')[1], 10)
    : 1;

  const [selectedPeriod, setSelectedPeriod] = useState<string>(initialPeriod);
  const [selectedHour, setSelectedHour] = useState<number>(initialHour);
  const [selectedMinute, setSelectedMinute] = useState<number>(initialMinute);

  const periods = ['오전', '오후'];
  const hours = Array(12)
    .fill(0)
    .map((_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array(59)
    .fill(0)
    .map((_, i) => (i + 1).toString().padStart(2, '0'));

  const handleConfirmClick = () => {
    const time = {
      period: selectedPeriod,
      hour: hours[selectedHour - 1],
      minute: minutes[selectedMinute - 1],
    };
    onChange(time); // 선택한 시간을 객체로 전달
    onClose();
  };
  return (
    <ModalBackground>
      <ModalContainer>
        <p>시간 설정</p>
        <img src="/assets/common/cancel-button.png" alt="" onClick={onClose} />
        <SwiperContainer>
          {/* 오전/오후 스와이퍼 */}
          <SwiperWrapper>
            <Swiper
              direction="vertical"
              slidesPerView={2}
              loop={false}
              centeredSlides={true}
              initialSlide={periods.indexOf(selectedPeriod)} // 초기 값 설정
              onSlideChange={(swiper) =>
                setSelectedPeriod(periods[swiper.realIndex])
              }
              //  커스텀
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '6rem',
                paddingBottom: '5rem',
                height: '100%',
              }}
            >
              {periods.map((period) => (
                <SwiperSlide
                  key={period}
                  style={{
                    height: '60px', // 높이 설정
                  }}
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <StyledSwiperPeriodSlide $isActive={isActive}>
                      {period}
                    </StyledSwiperPeriodSlide>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>

          {/* hour 스와이퍼 */}
          <SwiperWrapper>
            <Swiper
              direction="vertical"
              slidesPerView={5}
              loop={true}
              centeredSlides={true}
              initialSlide={initialHour - 1} // 초기 값 설정
              onSlideChange={(swiper) => setSelectedHour(swiper.realIndex + 1)}
            >
              {hours.map((hour) => (
                <SwiperSlide key={hour}>
                  {({ isActive }: { isActive: boolean }) => (
                    <StyledSwiperSlide $isActive={isActive}>
                      {hour}
                    </StyledSwiperSlide>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>

          {/* minutes 스와이퍼 */}
          <SwiperWrapper>
            <Swiper
              direction="vertical"
              slidesPerView={5}
              loop={true}
              centeredSlides={true}
              initialSlide={initialMinute - 1} // 초기 값 설정
              onSlideChange={(swiper) =>
                setSelectedMinute(swiper.realIndex + 1)
              }
            >
              {minutes.map((minute) => (
                <SwiperSlide key={minute}>
                  {({ isActive }: { isActive: boolean }) => (
                    <StyledSwiperSlide $isActive={isActive}>
                      {minute}
                    </StyledSwiperSlide>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        </SwiperContainer>
        <ButtonContainer>
          <Button
            children={'선택'}
            disabled={false}
            userType={userType}
            onClick={handleConfirmClick} // 선택된 시간 전달
          />
        </ButtonContainer>
      </ModalContainer>
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

const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 1.8rem;
  padding-bottom: 1rem;
  p {
    color: #414040;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 800;
  }
  img {
    position: absolute;
    top: 1.8rem;
    right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    stroke-width: 1.5px;
    stroke: #5b5b5b;
  }
`;

const SwiperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 300px;
  padding: 1.1rem;
  margin-top: 2rem;
`;

const SwiperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSwiperSlide = styled.div<{ $isActive: boolean }>`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => (props.$isActive ? '#000' : '#aaa')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  padding: 10px;
  text-align: center;
`;

const StyledSwiperPeriodSlide = styled.div<{ $isActive: boolean }>`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => (props.$isActive ? '#000' : '#aaa')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
`;

export default TimePickerModal;
