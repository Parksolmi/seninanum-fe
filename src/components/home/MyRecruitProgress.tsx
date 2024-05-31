import React from 'react';
import styled from 'styled-components';

// interface

const ApplyMyRecruit: React.FC = () => {
  return (
    <BoxContainer>
      <ProfileBox>
        <ProfileStyle>
          <ProfileImage
            src={process.env.PUBLIC_URL + '/assets/common/profile.png'}
          ></ProfileImage>
          <ProfileHeartIcon
            src={process.env.PUBLIC_URL + '/assets/common/heart-icon.svg'}
          ></ProfileHeartIcon>
        </ProfileStyle>
      </ProfileBox>
      <TextBox>
        <ApplyText>내 구인글에 지원한 동백님</ApplyText>
        <NumberTextBox>
          <ApplyNumber>3명</ApplyNumber>
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
