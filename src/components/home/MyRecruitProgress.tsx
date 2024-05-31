import React from 'react';
import styled from 'styled-components';

// 프로필이미지 URL, 지원자 수
interface RecruitData {
  profileImage: string;
  applicantCount: number;
}

const ApplyMyRecruit: React.FC<RecruitData> = ({
  profileImage,
  applicantCount,
}) => {
  // 지원자 수 따라 프로필 이미지 증가
  const profileImages = Array(applicantCount).fill(profileImage);

  return (
    <BoxContainer>
      {/* 구인글 지원한 동백이 0명인 경우 , 구인글을 작성하지 않은 나리인 경우-아직x */}
      {applicantCount === 0 ? (
        <ProfileBox>
          <ApplyZero>나에게 맞는 동백 추천 보러가기</ApplyZero>
        </ProfileBox>
      ) : (
        <ProfileBox>
          {profileImages.map((image, index) => (
            <ProfileStyle>
              <ProfileImage
                // src={process.env.PUBLIC_URL + '/assets/common/profile.png'}
                src={profileImage}
              ></ProfileImage>
              <ProfileHeartIcon
                src={process.env.PUBLIC_URL + '/assets/common/heart-icon.svg'}
              ></ProfileHeartIcon>
            </ProfileStyle>
          ))}
        </ProfileBox>
      )}

      <TextBox>
        <ApplyText>내 구인글에 지원한 동백님</ApplyText>
        <NumberTextBox>
          <ApplyNumber>{applicantCount}명</ApplyNumber>
          <MoreButtonBox>
            <MoreIcon
              src={process.env.PUBLIC_URL + '/assets/common/more-icon.svg'}
            ></MoreIcon>
          </MoreButtonBox>
        </NumberTextBox>
      </TextBox>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  width: 100%;
  height: 4.625rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  /* 임시 */
  margin-bottom: 5rem;
`;
const ProfileBox = styled.div`
  width: 100%;
  height: 4.625rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  border-radius: 0.625rem 0.625rem 0rem 0rem;
  border: 2px solid var(--Base-Gray2, #ebeceb);
  background: #fff;
  padding: 0.5rem;
`;
const ApplyZero = styled.div`
  width: 100%;
  color: var(--Base-Deep-Gray, #5b5b5b);
  font-family: Nanum_Square;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileStyle = styled.div`
  width: 3.0625rem;
  height: 3.39744rem;
  flex-shrink: 0;
  margin-right: 0.3rem;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 3.0625rem;
  height: 3.39744rem;
  flex-shrink: 0;
`;

const ProfileHeartIcon = styled.img`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const TextBox = styled.div`
  width: 100%;
  height: 3.125rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 0.625rem 0.625rem;
  background: var(--Secondary-nari2, #ffebb2);
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

const NumberTextBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ApplyText = styled.div`
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 4.3rem;
`;

const ApplyNumber = styled.div`
  color: var(--Base-Black, #000);
  text-align: right;
  font-family: Nanum_Square;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const MoreButtonBox = styled.button`
  display: flex;
  width: 1.5rem;
  height: 1.4375rem;
  padding: 0.375rem 0rem 0.3125rem 0rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: transparent;
  border: transparent;
`;

const MoreIcon = styled.img`
  width: 0.375rem;
  height: 0.75rem;
  flex-shrink: 0;
`;

export default ApplyMyRecruit;
