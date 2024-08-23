import React from 'react';
import styled from 'styled-components';
import dong from '../../constants/walkThroughDongState';
import nari from '../../constants/walkThroughNariState';

interface AssetArrayProps {
  userType: string;
  index: number;
}

const AssetArray: React.FC<AssetArrayProps> = ({ userType, index }) => {
  return (
    <>
      <ImgaeWrap>
        {index === 2 && userType === 'dong' ? (
          <ImgaeStyleEtc
            src={`/assets/walkthrough/workthrough-step${index}-${userType}.svg`}
          ></ImgaeStyleEtc>
        ) : (
          <ImgaeStyle
            src={`/assets/walkthrough/workthrough-step${index}-${userType}.svg`}
          ></ImgaeStyle>
        )}
      </ImgaeWrap>
      {userType === 'dong' ? (
        <>
          <TitleTextStyle>{dong[index - 1].title}</TitleTextStyle>
          <TextStyle>{dong[index - 1].text}</TextStyle>
        </>
      ) : (
        <>
          <TitleTextStyle>{nari[index - 1].title}</TitleTextStyle>
          <TextStyle>{nari[index - 1].text}</TextStyle>
        </>
      )}
    </>
  );
};
const ImgaeWrap = styled.div`
  display: flex;
  margin-top: 10rem;
  justify-content: center;
`;
const ImgaeStyle = styled.img`
  justify-content: center;
`;
const ImgaeStyleEtc = styled.img`
  justify-content: center;
  margin-right: 3rem;
`;
const TitleTextStyle = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 22px;
  font-weight: 400;
  margin-top: 2.3rem;
`;
const TextStyle = styled.div`
  color: #4d4d4d;
  text-align: center;
  font-family: NanumSquare;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.54px;
  margin-top: 1.2rem;
  white-space: pre;
`;
export default AssetArray;
