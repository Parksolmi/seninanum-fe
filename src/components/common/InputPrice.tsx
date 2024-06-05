import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type ButtonType = 'dong' | 'nari';

const InputPrice = () => {
  const [selectedButton, setSelectedButton] = useState<
    'hourly' | 'perItem' | null
  >(null);

  const handleButtonClick = (button: 'hourly' | 'perItem') => {
    setSelectedButton(button);
  };
  return (
    <PriceInputContainer>
      <Container>
        <Button
          selected={selectedButton === 'hourly'}
          buttonType="dong"
          onClick={() => handleButtonClick('hourly')}
        >
          시간당
        </Button>
        <Button
          selected={selectedButton === 'perItem'}
          buttonType="dong"
          onClick={() => handleButtonClick('perItem')}
        >
          건당
        </Button>
      </Container>
      <InputArea>
        <PriceInput>
          <InputField placeholder="희망가격"></InputField>
        </PriceInput>
        <WonText>원 이하</WonText>
      </InputArea>
    </PriceInputContainer>
  );
};
const PriceInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled.button<{ selected: boolean; buttonType: ButtonType }>`
  width: 100%;
  padding: 1rem 3.2rem;
  margin-right: 0.4rem;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
  border-radius: 0.625rem;
  background-color: transparent;

  ${({ selected, buttonType }) => css`
    border: ${selected
      ? buttonType === 'dong'
        ? '2px solid var(--Primary-dong, #FF314A)'
        : '2px solid  var(--Primary-nari, #FFAA0E)'
      : '2px solid  var(--Base-Black, #000)'};
    color: ${selected
      ? buttonType === 'dong'
        ? 'var(--Primary-dong, #FF314A)'
        : 'var(--Primary-nari, #FFAA0E)'
      : 'var(--Base-Black, #000)'};
  `}
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: row;
`;
const PriceInput = styled.div`
  width: 12rem;
  height: 0.0625rem;
  background: var(--Base-Gray, #8e8e8e);
`;

const InputField = styled.input`
  width: 100%;
  color: var(--Base-Black, #000);
  font-family: NanumSquare;
  font-size: 1.125rem;
  padding-left: 35%;
  padding-right: 20%;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-width: 0;
  border-width: 0 0 2px;
  &::placeholder {
    font-weight: 300;
    line-height: 1rem;
    color: var(--Base-Deep-Gray);
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
