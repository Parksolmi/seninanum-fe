import React from 'react';
import styled from 'styled-components';

interface AssetArrayProps {
  userType: string;
  index: number;
}

const AssetArray: React.FC<AssetArrayProps> = ({ userType, index }) => {
  const dong = [
    {
      index: 1,
      title: '경력 프로필을 등록해보세요!',
      text: `경력 내용과 자기소개를 잘 작성할수록\n나에 대한 신뢰도가 올라가요.`,
    },
    {
      index: 2,
      title: '구인글에 지원해보세요!',
      text: `나리가 올린 구인글에 지원할 수 있어요.\n나리가 나의 프로필을 열람한 후,\n승낙할거예요.`,
    },
    {
      index: 3,
      title: '시니페이로 거래해보세요!',
      text: `채팅방에서 상의한 금액을\n안전한 시니페이로 거래할 수 있어요.`,
    },
    {
      index: 4,
      title: '전세대와 소통해보세요!',
      text: `나의 노하우를 글로 남겨 공유하고,\n나리의 고민을 상담해주거나\n자유로운 주제로 이야기 할 수 있어요.`,
    },
  ];
  const nari = [
    {
      index: 1,
      title: '희망조건을 입력해보세요!',
      text: `입력하신 조건에 따라\n나에게 적합한 동백을 추천받을 수 있어요.`,
    },
    {
      index: 2,
      title: '구인글을 작성해보세요!',
      text: `구인글을 작성하면\n동백이 먼저 지원할거에요.\n지원한 동백의 프로필을 열람한 후,\n채팅을 보낼 수 있어요.`,
    },
    {
      index: 3,
      title: '시니페이로 거래해보세요!',
      text: `채팅방에서 상의한 금액을\n안전한 시니페이로 거래할 수 있어요.`,
    },
    {
      index: 4,
      title: '전세대와 소통해보세요!',
      text: `나의 고민을 연륜 있는 동백에게 상담받고,\n동백의 노하우가 담긴 글을 보거나\n자유로운 주제로 이야기 할 수 있어요.`,
    },
  ];
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
