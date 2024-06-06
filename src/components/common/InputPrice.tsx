import React, { useState } from 'react';
import styled from 'styled-components';

interface RadioButtonProps {
  selected: boolean;
  buttontype: 'dong' | 'nari';
}

const InputPrice: React.FC<RadioButtonProps> = ({ selected, buttontype }) => {
  const [selectedButton, setSelectedButton] = useState<
    'hourly' | 'perItem' | null
  >(null);

  const [price, setPrice] = useState<string>('');

  // 버튼 클릭 시 상태 업데이트
  const handleButtonClick = (button: 'hourly' | 'perItem') => {
    setSelectedButton(button);
  };

  // 입력값 변경 시 상태 업데이트
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  // click 시 아이콘 이미지 변경
  const getImageSrc = (selected: boolean, buttontype: 'dong' | 'nari') => {
    if (selected) {
      return buttontype === 'dong'
        ? '/assets/home/radio-filled-dong.svg'
        : '/assets/home/radio-filled-nari.svg';
    }
    return '/assets/home/radio-empty.svg';
  };
  return (
    <PriceInputContainer>
      <Container>
        <ButtonBox>
          <RadioButton onClick={() => handleButtonClick('hourly')}>
            <img
              src={getImageSrc(selectedButton === 'hourly', 'dong')}
              alt=""
            />
          </RadioButton>
          <Button>시간당</Button>
        </ButtonBox>
        <ButtonBox>
          <RadioButton onClick={() => handleButtonClick('perItem')}>
            <img
              src={getImageSrc(selectedButton === 'perItem', 'dong')}
              alt=""
            />
          </RadioButton>
          <Button>건당</Button>
        </ButtonBox>
        <InputArea>
          <PriceInput>
            <InputField
              type="number"
              value={price}
              onChange={handleInputChange}
              placeholder="희망가격"
            ></InputField>
          </PriceInput>
          <WonText>원</WonText>
        </InputArea>
      </Container>
    </PriceInputContainer>
  );
};
const PriceInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`;

const ButtonBox = styled.div`
  margin-right: 0.8rem;
  display: flex;
`;

const Button = styled.div`
  margin-left: 0.4rem;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
`;

const RadioButton = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: transparent;

  img {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const InputArea = styled.div`
  margin-left: 0.6rem;
  display: flex;
  flex-direction: row;
`;
const PriceInput = styled.div`
  width: 9rem;
  height: 0.0625rem;
`;

const InputField = styled.input`
  text-align: center;
  padding: 0;
  width: 100%;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-width: 0;
  border-width: 0 0 2px;
  &::placeholder {
    font-weight: 300;
    line-height: 1rem;
    color: #989898;
  }
  &:focus {
    outline: none;
  }
`;

const WonText = styled.div`
  color: var(--Base-Black, #000);
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 0.6rem;
  margin-top: 0.2rem;
`;

export default InputPrice;
