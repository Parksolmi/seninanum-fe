import React from 'react';
import styled from 'styled-components';

const BasicProfile = ({ userType }) => {
  return (
    <WrapBaseProfile>
      <WrapProfile>
        <img src={`/assets/common/badge-dong.png`} alt="profile" />
      </WrapProfile>
      <h2 className="nickname">000 {userType === 'dong' ? '동백' : '나리'}</h2>
      <p className="view-profile-btn">프로필 보기</p>
    </WrapBaseProfile>
  );
};

const WrapBaseProfile = styled.div`
  .nickname {
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1.2rem 0 0.8rem 0;
  }

  .view-profile-btn {
    color: var(--Base-Deep-Gray, #5b5b5b);
    text-align: center;
    font-family: 'NanumSquareR';
    font-size: 1.125rem;
    text-decoration-line: underline;
  }
`;

const WrapProfile = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 6.25rem;
    height: 6.25rem;
    background-color: gray;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default BasicProfile;
