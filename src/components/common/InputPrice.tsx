import React from 'react';
import styled from 'styled-components';
import Category from './Category';

interface RadioButtonProps {
  selected: boolean;
  buttontype: 'dong' | 'nari';
}
const priceCategory: string[] = ['시간당', '건당'];
const InputPrice: React.FC<RadioButtonProps> = () => {
  return (
    <Wrapper>
      <Container>
        <Category label="" list={priceCategory} type={'nari'}></Category>
      </Container>
      <InputArea>
        <PriceInput>
          <InputField placeholder="희망가격" type="number"></InputField>
        </PriceInput>
      </InputArea>
      <WonText>원</WonText>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  margin-top: 0.8rem;
`;

const Container = styled.div`
  width: 50%;
  flex-direction: row;
`;

const InputArea = styled.div`
  margin-left: 1.2rem;
  flex-direction: row;
`;
const PriceInput = styled.div`
  width: 9rem;
  height: 0.0625rem;
  padding-top: 25%;
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
  border-color: var(--Base-Gray, #8e8e8e);
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
  padding-top: 10%;
`;

export default InputPrice;
