import React from 'react';
import styled from 'styled-components';

interface BriefProfileCardProps {
  profile?: string;
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
  profile,
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
        <ProfileImg src={profile} alt="profile" />
        <WrapProfileInfo>
          <WrapTop>
            <ProfileInfo>
              <span>
                {nickname}{' '}
                {isMyProfile
                  ? type === 'dong'
                    ? '나리'
                    : '동백'
                  : type === 'dong'
                  ? '동백'
                  : '나리'}{' '}
              </span>
            </ProfileInfo>
            <BadgeIcon
              src={
                isMyProfile
                  ? type === 'dong'
                    ? '/assets/common/badge-nari.png'
                    : '/assets/common/badge-dong.png'
                  : type === 'dong'
                  ? '/assets/common/badge-dong.png'
                  : '/assets/common/badge-nari.png'
              }
              alt="badge"
            />
          </WrapTop>
          <WrapBottom>
            <Tags>
              <Tag $type={type}>{gender === 'F' ? '여성' : '남성'}</Tag>
              <Tag $type={type}>{age}</Tag>
            </Tags>
          </WrapBottom>
        </WrapProfileInfo>
      </WrapProfile>
      {introduce && <WrapIntroduce>{introduce}</WrapIntroduce>}
    </>
  );
};

const WrapProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 5.0625rem;
  height: 5.0625rem;
  flex-shrink: 0;
`;

const WrapProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 0.5rem;
`;

const WrapTop = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--Base-Black, #000);
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  p {
    font-size: 1.375rem;
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

const BadgeIcon = styled.img`
  align-items: center;
  justify-content: center;
  object-fit: contain;
  width: 10%;
`;

const WrapIntroduce = styled.div`
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

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface tagType {
  $type: string;
}
const Tag = styled.div<tagType>`
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
