import React from 'react';
import styled from 'styled-components';

interface BriefProfileCardProps {
  // profile: string;
  type: string;
  nickname: string;
  // age: string;
  // method: string;
  // content: string;
  gender: string;
  age: string;
  introduce?: string;
  isMyProfile?: boolean;
}

const BriefProfileMultiCard = ({
  // profile,
  type,
  nickname,
  // age,
  // method,
  // content,
  gender,
  age,
  introduce,
  isMyProfile,
}: BriefProfileCardProps) => {
  return (
    <>
      <WrapProfile>
        <WrapTop>
          <ProfileImg src={'/assets/common/profile.png'} alt="profile" />
          <WrapSide>
            <WrapSideTop>
              <ProfileInfo>
                <span>
                  {nickname} {type === 'dong' && isMyProfile ? '나리' : '동백'}
                </span>
              </ProfileInfo>
              <BadgeIcon
                src={
                  type === 'dong' && isMyProfile
                    ? '/assets/common/badge-nari.png'
                    : '/assets/common/badge-dong.png'
                }
                alt="badge"
              />
            </WrapSideTop>
            <WrapSideBottom>
              <Fields>
                {gender === 'F' ? (
                  <Field $type={type}>여성</Field>
                ) : (
                  <Field $type={type}>남성</Field>
                )}
                <Field $type={type}>{age}</Field>
              </Fields>
            </WrapSideBottom>
          </WrapSide>
        </WrapTop>
        <WrapBottom>{introduce}</WrapBottom>
      </WrapProfile>
    </>
  );
};

const WrapProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.7rem;
`;

const WrapTop = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const WrapSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 0.5rem;
`;

const WrapSideTop = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--Base-Black, #000);
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BadgeIcon = styled.img`
  align-items: center;
  justify-content: center;
  object-fit: contain;
  width: 10%;
`;

const WrapSideBottom = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const WrapBottom = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 5.0625rem;
  height: 5.0625rem;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  p {
    font-size: 1.125rem;
  }
  strong {
    font-size: 1.375rem;
    font-weight: 700;
  }
  span {
    color: var(--Base-Black, #000);
    font-size: 1.375rem;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
interface fieldType {
  $type: string;
}
const Field = styled.div<fieldType>`
  border-radius: 0.5rem;
  background: ${({ $type }) =>
    $type === 'nari' ? 'var(--Secondary-dong-2)' : 'var(--Secondary-nari-2)'};
  color: var(--Base-Deep-Gray, #5b5b5b);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
`;

export default BriefProfileMultiCard;
