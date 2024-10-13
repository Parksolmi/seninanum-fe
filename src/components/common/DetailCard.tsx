import React from 'react';
import styled from 'styled-components';

interface DetailCardProps {
  type: string;
  title: string;
  content: string;
  nickname?: string;
  age?: string;
  method: string;
  region?: string;
  navigateTo: () => void;
  isMyProfile?: boolean;
  // 구인글 관리 권한이 있는 페이지인 경우 삭제하기 버튼을 추가한다.
  isEditable?: boolean;
  onDelete?: () => void;
}

const DetailCard = ({
  type,
  title,
  content,
  nickname,
  age,
  method,
  region,
  navigateTo,
  isMyProfile,
  isEditable,
  onDelete,
}: DetailCardProps) => {
  return (
    <InputContainer>
      {/* 클릭 가능한 메인 내용 영역 */}
      <ClickableArea onClick={navigateTo}>
        {!isMyProfile && (
          <WrapProfile>
            <ProfileInfo>
              <span>
                {nickname} {type === 'dong' ? '동백' : '나리'} | {age}
              </span>
            </ProfileInfo>
          </WrapProfile>
        )}

        <WrapTitle>{title}</WrapTitle>
        <WrapContent>{content}</WrapContent>
        <WrapTag>
          <Tag $type={type}>{method?.replace('서비스', '')}</Tag>
          {region !== '' && <Tag $type={type}>서울시 {region}</Tag>}
        </WrapTag>
      </ClickableArea>

      {/* 버튼 영역 */}
      {isMyProfile && isEditable ? (
        type === 'dong' ? (
          <ManageRecruitButton>
            <>
              <span>지원자</span>
              <p>3</p>
            </>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭 이벤트 방지
                // 삭제 기능 추가
                onDelete?.();
              }}
            >
              삭제하기
            </button>
          </ManageRecruitButton>
        ) : (
          <ManageApplicationButton>
            {' '}
            <>
              <span>24.10.11</span>
              <p>지원함</p>
            </>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭 이벤트 방지
                // 취소 기능 추가
              }}
            >
              취소하기
            </button>
          </ManageApplicationButton>
        )
      ) : (
        ''
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
`;

const ClickableArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WrapProfile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
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

const WrapTitle = styled.div`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.1;
  font-family: NanumSquare;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WrapContent = styled.p`
  font-size: 1.3rem;
  line-height: 1.4rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const WrapTag = styled.div`
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
  color: var(--Base-Deep-Gray, #414040);
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

const ManageRecruitButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.0375rem;
  }
  p {
    margin-left: 0.3rem;
    color: #f48400;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.0375rem;
  }
  button {
    margin-left: auto;
    color: #5b5b5b;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.025rem;
    text-decoration-line: underline;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
  }
`;

const ManageApplicationButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.0375rem;
  }
  p {
    margin-left: 0.3rem;
    color: #ff314a;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.0375rem;
  }
  button {
    margin-left: auto;
    color: #5b5b5b;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.025rem;
    text-decoration-line: underline;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
  }
`;

export default DetailCard;
