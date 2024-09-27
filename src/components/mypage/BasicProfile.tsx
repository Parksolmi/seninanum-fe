import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';

const BasicProfile = ({ userType }) => {
  const navigate = useNavigate();

  const fetchProfileId = async () => {
    try {
      const res = await instance.post('/career');
      return res.data.profileId;
    } catch (error) {
      console.error('사용자 정보 조회에 실패하였습니다.');
    }
  };

  const handleViewProfileClick = async () => {
    if (userType === 'dong') {
      const profileId = await fetchProfileId();
      if (profileId) {
        navigate(`/view/myprofile/${userType}/${profileId}`);
      } else {
        console.error('Profile ID를 가져오지 못했습니다.');
      }
    } //나리 내 프로필 조회
    else {
      navigate(`/view/myprofile/${userType}`);
    }
  };

  return (
    <WrapBaseProfile>
      <WrapProfile>
        <img src={`/assets/common/badge-dong.png`} alt="profile" />
      </WrapProfile>
      <h2 className="nickname">000 {userType === 'dong' ? '동백' : '나리'}</h2>
      <p className="view-profile-btn" onClick={handleViewProfileClick}>
        프로필 보기
      </p>
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
