import React from 'react';
import styled from 'styled-components';

// interface

const RecommendDongCard: React.FC = () => {
  return (
    <WrapCard>
      <ProfileImage
        src={process.env.PUBLIC_URL + '/assets/common/profile.png'}
      ></ProfileImage>
      <ProfileNameBox>
        <ProfileNickname>닉네임</ProfileNickname>
        <ProfileType>동백</ProfileType>
        <ProfileBadge
          src={process.env.PUBLIC_URL + '/assets/common/badge-dong.png'}
        ></ProfileBadge>
      </ProfileNameBox>
      <TagContainer>
        <AgeTag>
          <TagText>62세</TagText>
        </AgeTag>
        <GenderTag>
          <TagText>여자</TagText>
        </GenderTag>
      </TagContainer>
      <CategoryWrapTag>
        <TagText>교육·돌봄</TagText>
      </CategoryWrapTag>
    </WrapCard>
  );
};

const WrapCard = styled.div`
  /* 임시 */
  margin-top: 4rem;
  margin-bottom: 4rem;

  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 100%;
  height: 14rem;
  flex-shrink: 0;
  fill: var(--Base-White, #fff);
  box-shadow: 0px 2px 6.3px rgba(150, 150, 150, 0.4);
`;

const ProfileImage = styled.img`
  width: 3.75rem;
  height: 4rem;
  flex-shrink: 0;
  margin-top: 1rem;
  margin-left: 1.6rem;
  margin-right: 1.6rem;
  display: block;
  margin: auto;
`;

const ProfileNameBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.4rem;
  margin-bottom: 0.69rem;
  align-items: center;
  justify-content: center;
`;

const ProfileNickname = styled.div`
  margin-right: 0.2rem;
  color: #000;
  text-align: center;
  font-family: Nanum_Square;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProfileType = styled.div`
  margin-right: 0.2rem;
  color: #000;
  text-align: center;
  font-family: Nanum_Square;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProfileBadge = styled.img`
  width: 1.375rem;
  height: 0.875rem;
  flex-shrink: 0;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.3rem;
  width: 100%;
`;
const AgeTag = styled.div`
  flex: 1;
  height: 2.3rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.3rem;
  border-radius: 0.5rem;
  background: var(--Secondary-nari2, #ffebb2);
`;
const GenderTag = styled.div`
  flex: 1;
  width: 50%;
  height: 2.3rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--Secondary-nari2, #ffebb2);
`;

const TagText = styled.div`
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  align-items: center;
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
  margin-bottom: 1.1rem;
`;

export default RecommendDongCard;
