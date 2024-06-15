import React from 'react';
import styled from 'styled-components';

// interface
interface ProfileProps {
  nickname: string;
  types: string;
  age: string;
  gender: string;
  tagText: string;
}

const ProfileVerticalCard = ({
  nickname,
  types,
  age,
  gender,
  tagText,
}: ProfileProps) => {
  return (
    <WrapCard>
      <ProfileImage
        src={process.env.PUBLIC_URL + '/assets/common/profile.png'}
      ></ProfileImage>
      <ProfileNameBox>
        <ProfileNickname>{nickname}</ProfileNickname>
        <ProfileType>
          {types !== null ? (types === 'dong' ? '동백' : '나리') : null}
        </ProfileType>
        <ProfileBadge
          src={process.env.PUBLIC_URL + '/assets/common/badge-dong.png'}
        ></ProfileBadge>
      </ProfileNameBox>
      <TagContainer>
        <AgeTag>
          <TagText>{`${age} | ${gender}`}</TagText>
        </AgeTag>
      </TagContainer>
      <CategoryWrapTag>
        <TagText>{tagText}</TagText>
      </CategoryWrapTag>
    </WrapCard>
  );
};

const WrapCard = styled.div`
  padding: 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  fill: var(--Base-White, #fff);
  box-shadow: 0px 2px 6.3px rgba(150, 150, 150, 0.4);
  max-width: 10rem;
`;

const ProfileImage = styled.img`
  width: 3.75rem;
  flex-shrink: 0;
  margin-bottom: 1rem;
  border-radius: 50%;
`;

const ProfileNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProfileNickname = styled.div`
  margin-right: 0.2rem;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
`;

const ProfileType = styled.div`
  margin-right: 0.2rem;
  color: #000;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
`;

const ProfileBadge = styled.img`
  width: 1.375rem;
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
`;
const AgeTag = styled.div`
  flex: 1;
  height: 2.3rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagText = styled.div`
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
`;

const CategoryWrapTag = styled.div`
  width: 100%;
  height: 2.3rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--Secondary-nari2, #ffebb2);
`;

export default ProfileVerticalCard;
