import React from 'react';
import styled from 'styled-components';

interface ManageCardProps {
  type: string;
  title: string;
  content: string;
  method: string;
  region?: string;
  navigateTo: () => void;
  onDelete?: () => void;
  applicantCount?: number;
}

// 나리 구인글 관리 카드
const ManageCard = ({
  type,
  title,
  content,
  method,
  region,
  navigateTo,
  onDelete,
  applicantCount,
}: ManageCardProps) => {
  return (
    <InputContainer>
      {/* 클릭 가능한 메인 내용 영역 */}
      <ClickableArea onClick={navigateTo}>
        <WrapTitle>{title}</WrapTitle>
        <WrapContent>{content}</WrapContent>
        <WrapTag>
          <Tag $type={type}>{method?.replace('서비스', '')}</Tag>
          {region !== '' && <Tag $type={type}>서울시 {region}</Tag>}
        </WrapTag>
      </ClickableArea>

      {/* 버튼 영역 */}
      <ManageRecruitButton>
        <>
          <span>지원자</span>
          <p>{applicantCount}</p>
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
  font-family: NanumSquare;
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

export default ManageCard;
