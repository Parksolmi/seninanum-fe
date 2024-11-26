import React from 'react';
import styled from 'styled-components';

interface CustomizedNariCardProps {
  field: string;
  profile?: string;
  nickname?: string;
  age?: string;
  gender?: string;
  isExist?: boolean;
  onClick?: () => void;
}

const CustomizedNariCard = ({
  field,
  profile,
  nickname,
  age,
  gender,
  isExist = true,
  onClick,
}: CustomizedNariCardProps) => {
  return (
    <>
      {isExist ? (
        <CardContainer onClick={onClick}>
          <span>{field}</span>
          <img src={profile} alt="프로필 사진" />
          <UserInfoArea>
            <RowArea>
              <NicknameText>{nickname}</NicknameText>
              <UserTypeText>동백</UserTypeText>
            </RowArea>
            <RowArea>
              <p>
                {age} | {gender}
              </p>
            </RowArea>
          </UserInfoArea>
        </CardContainer>
      ) : (
        <CardContainer>
          <span>{field}</span>
          <img
            className="notfound"
            src={'/assets/character/nari-notfound.png'}
            alt="프로필 사진 없음"
          />
          <UserInfoArea>
            {field} 분야의 전문가가 <br />
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
    object-fit: cover;
    flex-shrink: 0;
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
  max-width: 50%;
`;

const UserTypeText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
`;

export default CustomizedNariCard;
