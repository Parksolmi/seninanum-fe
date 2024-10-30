import React from 'react';
import styled from 'styled-components';

const CustomizedCard = () => {
  return (
    <CardContainer>
      <span>디지털</span>
      <img src="/assets/common/profile.png" alt="" />
      <UserInfoArea>
        <RowArea>
          <NicknameText>닉네임</NicknameText>
          <UserTypeText>동백</UserTypeText>
        </RowArea>
        <RowArea>
          <p>60대 | 여성</p>
        </RowArea>
      </UserInfoArea>
    </CardContainer>
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
    background: #ffd111;
    border-radius: 1.25rem 0rem 0rem 1.25rem;
    color: #464646;
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
`;

const UserInfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RowArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    color: #5b5b5b;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    letter-spacing: 0.03375rem;
  }
`;

const NicknameText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 42%;
`;

const UserTypeText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
`;

export default CustomizedCard;
