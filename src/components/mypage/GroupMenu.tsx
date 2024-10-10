import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface GroupMenuProps {
  userType: string;
}

const GroupMenu: React.FC<GroupMenuProps> = ({ userType }) => {
  const navigate = useNavigate();

  return (
    <>
      <WrapGroupMenu>
        <h3 className="group-title">나의 활동</h3>
        <div className="menu" onClick={() => navigate('/')}>
          <div>받은 리뷰 조회</div>
          <img src="/assets/common/arrow-gray.png" alt="계정 관리" />
        </div>
        <div className="menu" onClick={() => navigate('/')}>
          <div>작성한 리뷰 조회</div>
          <img src="/assets/common/arrow-gray.png" alt="계정 관리" />
        </div>
        {userType === 'nari' ? (
          <div className="menu" onClick={() => navigate('/manage/myrecruit')}>
            <div>내 구인글 관리</div>
            <img src="/assets/common/arrow-gray.png" alt="계정 관리" />
          </div>
        ) : (
          <div
            className="menu"
            onClick={() => navigate('/manage/myapplication')}
          >
            <div>지원 내역 조회</div>
            <img src="/assets/common/arrow-gray.png" alt="계정 관리" />
          </div>
        )}
      </WrapGroupMenu>
      <WrapGroupMenu>
        <h3 className="group-title">기타</h3>
        <div className="menu" onClick={() => navigate('/')}>
          <div>계정 관리</div>
          <img src="/assets/common/arrow-gray.png" alt="계정 관리" />
        </div>
        <div className="menu" onClick={() => navigate('/')}>
          <div>1:1 문의하기</div>
          <img src="/assets/common/arrow-gray.png" alt="계정 관리" />
        </div>
        <div className="menu" onClick={() => navigate('/')}>
          <div>앱 버전</div>
          <div className="version">1.0.0</div>
        </div>
      </WrapGroupMenu>
    </>
  );
};

const WrapGroupMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  border-radius: 1.25rem;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  padding: 1rem;

  &.pay {
    background: #ff314a;
    color: white;
  }

  .group-title {
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 400;

    img {
      height: 1rem;
    }

    .version {
      color: var(--Base-Gray, #8e8e8e);
      text-align: right;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-weight: 400;
    }
  }
`;

export default GroupMenu;
