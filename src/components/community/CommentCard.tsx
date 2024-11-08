import React from 'react';
import styled from 'styled-components';
import { parseTime } from '../../utils/formatTime';

interface Comment {
  id: number;
  profileId: number;
  content: string;
  isSecret: boolean;
  parentId: number | null;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
  replies: Comment[];
}

interface CommentCardProps {
  content: string;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
  parentId: number | null;
  replies: Comment[];
  onReply: () => void;
}

const CommentCard = ({
  content,
  createdAt,
  profile,
  nickname,
  userType,
  parentId,
  replies,
  onReply,
}: CommentCardProps) => {
  return (
    <WrapContent $userType={userType || ''} $isReply={!!parentId}>
      <WrapWriter>
        <img className="profile" src={profile} alt="프로필" />
        <WrapInfo>
          <div className="left">
            <div className="nickname">
              {nickname} {userType === 'dong' ? '동백' : '나리'}
            </div>
            <div className="time">{parseTime(createdAt || '')}</div>
          </div>
        </WrapInfo>
      </WrapWriter>
      <WrapText $isReply={!!parentId}>
        <p>{content}</p>
      </WrapText>

      <WrapBottom>
        {!parentId && (
          <div className="bottom-left" onClick={onReply}>
            <img
              className="comment-icon"
              src="/assets/community/comment-gray.svg"
              alt="댓글아이콘"
            />
            <p className="comment-text">답글쓰기</p>
          </div>
        )}
        <div className="bottom-right">
          <img
            className="like-button"
            src="/assets/community/like-empty.png"
            alt="빈하트"
          />
        </div>
      </WrapBottom>

      {replies &&
        replies.map((reply) => (
          <CommentCard
            key={reply.id}
            content={reply.content}
            createdAt={reply.createdAt}
            profile={reply.profile}
            nickname={reply.nickname}
            userType={reply.userType}
            parentId={reply.parentId}
            replies={reply.replies}
            onReply={onReply}
          />
        ))}
    </WrapContent>
  );
};

interface WrapInfoProp {
  $userType: string;
  $isReply: boolean;
}

const WrapContent = styled.div<WrapInfoProp>`
  /* padding: 1.1rem 1.1rem; */
  padding: ${({ $isReply }) =>
    $isReply ? '0.2rem 0rem 0rem 1rem' : '1.1rem 1.1rem'};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .bottom-right {
    display: flex;
    margin-left: auto;

    .like-button {
      width: 1.3rem;
    }
    .count {
      color: ${({ $userType }) =>
        $userType === 'dong'
          ? 'var(--Dong-main, #FF314A)'
          : 'var(--Nari-2, var(--Primary-nari, #ffaa0e))'};
      text-align: right;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }

  .bottom-left {
    display: flex;
    flex-direction: row;

    .comment-icon {
      width: 1.125rem;
      margin-right: 0.2rem;
    }

    .comment-text {
      color: #5b5b5b;
      font-family: NanumSquare;
      font-size: 1.125rem;
      letter-spacing: 0.03375rem;
    }
  }
`;

const WrapWriter = styled.div`
  display: flex;

  .profile {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;

    background: gray; //임시
    object-fit: cover;
  }
`;

const WrapInfo = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding-left: 0.6rem;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;

    .nickname {
      color: var(--Base-Black, #000);
      text-align: center;
      font-family: NanumSquare;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.0375rem;
    }

    .time {
      color: var(--Base-Deep-Gray, #5b5b5b);
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }
`;

interface WrapTextProp {
  $isReply: boolean;
}

const WrapText = styled.div<WrapTextProp>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  //padding-left: ${({ $isReply }) => ($isReply ? '1.8rem' : '')};
  p {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.25rem;
    letter-spacing: 0.075rem;
  }
`;

const WrapBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default CommentCard;
