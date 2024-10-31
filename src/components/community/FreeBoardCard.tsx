import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FreeBoardCard = ({
  id,
  title,
  content,
  likes,
  commentCount,
  userType,
  nickname,
  createdAt,
}) => {
  const navigate = useNavigate();

  return (
    <CardSection onClick={() => navigate(`/view/free/${id}`)}>
      <WrapCard>
        <h1>{title}</h1>
        <p className="preview">{content}</p>
        <div className="bottom-status-bar">
          <WrapIcon>
            <div className="icon">
              <img src="/assets/community/like.png" alt="좋아요수" />
              <p className="count">{likes}</p>
            </div>
            <div className="icon">
              <img src="/assets/community/comment.png" alt="댓글수" />
              <p className="count">{commentCount}</p>
            </div>
          </WrapIcon>
          <p className="writer">
            {createdAt} | {nickname} {userType}
          </p>
        </div>
      </WrapCard>
    </CardSection>
  );
};

const CardSection = styled.div`
  padding: 1.3rem 1.1rem 0 1.1rem;
`;

const WrapCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 1.2rem;

  h1 {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .preview {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.075rem;

    /* 2줄까지만 보이도록 설정 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .writer {
      color: #5b5b5b;
      text-align: right;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }
`;

const WrapIcon = styled.div`
  display: flex;
  gap: 1.2rem;

  .icon {
    display: flex;
    gap: 0.4rem;

    img {
      width: 0.9rem;
      object-fit: contain;
    }

    .count {
      color: #000;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      /* letter-spacing: 0.03375rem; */
    }
  }
`;

export default FreeBoardCard;
