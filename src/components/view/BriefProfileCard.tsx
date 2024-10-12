import React from 'react';
import styled from 'styled-components';

interface BriefProfileCardProps {
  // profile: string;
  type: string;
  nickname?: string;
  // age: string;
  // method: string;
  // content: string;
  gender: string;
  age: string;
  onClick: () => void;
}

const BriefProfileCard = ({
  // profile,
  type,
  nickname,
  // age,
  // method,
  // content,
  gender,
  age,
  onClick,
}: BriefProfileCardProps) => {
  return (
    <WrapProfile onClick={onClick}>
      <ProfileImg src={'/assets/common/profile.png'} alt="profile" />
      <ProfileInfo>
        <span>
          {nickname} {type === 'dong' ? '동백' : '나리'}{' '}
        </span>
      </ProfileInfo>
      <Tags>
        {gender === '여성' ? (
          <Tag $type={type}>여성</Tag>
        ) : (
          <Tag $type={type}>남성</Tag>
        )}
        <Tag $type={type}>{age}</Tag>
      </Tags>
    </WrapProfile>
  );
};

const WrapProfile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border: 2px solid #ebeceb;
  border-radius: 0.8rem;
  padding: 0.5rem 0.3rem;
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  width: 3.4375rem;
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
    font-size: 1.25rem;
  }
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

export default BriefProfileCard;
