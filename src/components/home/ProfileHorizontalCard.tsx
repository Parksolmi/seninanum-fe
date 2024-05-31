import React from 'react';
import styled from 'styled-components';

// interface

const ProfileHorizontalCard: React.FC = () => {
  return (
    <WrapCard>
      <TopBox>
        <ProfileImage
          src={process.env.PUBLIC_URL + '/assets/common/profile.png'}
        ></ProfileImage>
        <IntroduceBox>
          <ProfileNameBox>
            <ProfileNickname>닉네임</ProfileNickname>
            <ProfileType>동백</ProfileType>
            <ProfileBadge
              src={process.env.PUBLIC_URL + '/assets/common/badge-dong.png'}
            ></ProfileBadge>
          </ProfileNameBox>
          <IntroduceText>"맡은 일은 성실하게 합니다."</IntroduceText>
        </IntroduceBox>
      </TopBox>
      <BottomBox>
        <Tag>
          <TagText>62세</TagText>
        </Tag>
        <Tag>
          <TagText>여자</TagText>
        </Tag>
        <Tag>
          <TagText>교육·돌봄</TagText>
        </Tag>
      </BottomBox>
    </WrapCard>
  );
};

const WrapCard = styled.div`
  /* 임시 */
  margin-top: 4rem;
  margin-bottom: 4rem;

  padding-left: 0.9rem;
  padding-right: 0.9rem;
  padding-top: 0.8rem;
  /* padding-bottom: 0.8rem; */
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 100%;
  height: 8rem;
  flex-shrink: 0;
  fill: var(--Base-White, #fff);
  box-shadow: 0px 2px 6.3px rgba(150, 150, 150, 0.4);
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImage = styled.img`
  width: 3.75rem;
  height: 4rem;
  flex-shrink: 0;
  /* margin-top: 1rem; */
  display: flex;
`;

const IntroduceBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.62rem;
  display: flex;
  justify-content: center;
`;

const ProfileNameBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileNickname = styled.div`
  margin-right: 0.38rem;
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

const IntroduceText = styled.div`
  margin-top: 0.3rem;
  color: #000;
  font-family: Nanum_Square;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.2rem;
  width: 100%;
`;

const Tag = styled.div`
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

const TagText = styled.div`
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-items: center;
`;

export default ProfileHorizontalCard;
