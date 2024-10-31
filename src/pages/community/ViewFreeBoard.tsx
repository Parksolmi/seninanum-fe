import React from 'react';
import styled from 'styled-components';
import CommunityInput from '../../components/community/CommunityInput';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';

const ViewFreeBorad = () => {
  const { data: user } = useFetchUserType();

  return (
    <>
      <PrevHeader
        title={'자유게시판'}
        navigateTo={'/community/free'}
        isLine={true}
      />
      <WrapContent>
        <WrapWriter>
          <img
            className="profile"
            src="/assets/character/dong-notfound.png"
            alt="프로필"
          />
          <WrapInfo $userType={user?.userType || ''}>
            <div className="left">
              <div className="nickname">000 나리</div>
              <div className="time">08:43</div>
            </div>
            <div className="right">
              <img
                className="like-button"
                src="/assets/community/like-empty.png"
                alt="빈하트"
              />
              <p className="count">1</p>
            </div>
          </WrapInfo>
        </WrapWriter>
        <WrapText>
          <h1 className="title">부모님 생신선물 추천</h1>
          <p>
            곧 있으면 어머니 생신이신데 다들 부모님 생신 때 주로 어떤 선물을
            드리나요?
          </p>
        </WrapText>
      </WrapContent>
      <SplitLine />

      <CommunityInput
        submitHandler={() => {}}
        userType={user?.userType || ''}
      />
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const WrapWriter = styled.div`
  display: flex;

  .profile {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;

    background: gray; //임시
    object-fit: cover;
  }
`;

interface WrapInfoProp {
  $userType: string;
}

const WrapInfo = styled.div<WrapInfoProp>`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding-left: 0.6rem;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;

    .nickname {
      color: var(--Base-Black, #000);
      text-align: center;
      font-family: NanumSquare;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.0375rem;
    }

    .time {
      color: var(--Base-Deep-Gray, #5b5b5b);
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .like-button {
      width: 1.3rem;
    }
    .count {
      color: ${({ $userType }) =>
        $userType === 'dong'
          ? 'var(--Dong-main, #FF314A)'
          : 'var(--Nari-2, var(--Primary-nari, #ffaa0e))'};
      text-align: right;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }
`;

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h1 {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.075rem;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 0 0 1.3rem 0;
`;

export default ViewFreeBorad;
