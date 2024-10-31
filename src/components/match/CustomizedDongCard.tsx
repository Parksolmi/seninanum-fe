import React from 'react';
import styled from 'styled-components';

interface CustomizedDongCardProps {
  field: string;
  title?: string;
  isExist?: boolean;
}

const CustomizedDongCard = ({
  field,
  title,
  isExist = true,
}: CustomizedDongCardProps) => {
  return (
    <>
      {isExist ? (
        <CardContainer>
          <span>{field}</span>
          <UserInfoArea className="title">{title}</UserInfoArea>
        </CardContainer>
      ) : (
        <CardContainer>
          <span>{field}</span>
          <img
            className="notfound"
            src={'/assets/character/dong-notfound.png'}
            alt="프로필 사진 없음"
          />
          <UserInfoArea>
            {field} 분야의 구인글이 <br />
            아직 없어요.
          </UserInfoArea>
        </CardContainer>
      )}
    </>
  );
};

const CardContainer = styled.div`
  width: 100%;
  height: 4.375rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;

  span {
    width: 22%;
    height: 4.375rem;
    left: 0;
    background: var(--Primary-dong);
    border-radius: 1.25rem 0rem 0rem 1.25rem;
    color: white;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.0375rem;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }

  .notfound {
    width: 3.5rem;
    padding-left: 0.2rem;
    object-fit: contain;
  }
`;

const UserInfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  color: #5b5b5b;
  text-align: left;
  font-family: NanumSquare;
  font-size: 1.125rem;
  letter-spacing: 0.03375rem;

  &.title {
    overflow: hidden;
    color: var(--Base-Gray1, #414040);
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export default CustomizedDongCard;
