import React, { useState } from 'react';
import styled from 'styled-components';
import { parseTime } from '../../utils/formatTime';
import { instance } from '../../api/instance';

interface Comment {
  id: number;
  profileId: number;
  content: string;
  isSecret: boolean;
  parentId: number | null;
  likes: number;
  liked: number;
  isPostOwner: boolean;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
  //cardType:string;
  replies: Comment[];
}

interface CommentCardProps {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  liked: number;
  isPostOwner: boolean;
  profile: string;
  nickname: string;
  userType: string;
  cardType: string;
  parentId: number | null;
  replies: Comment[];
  onReply: () => void;
}

const CommentCard = ({
  id,
  content,
  createdAt,
  likes,
  liked,
  isPostOwner,
  profile,
  nickname,
  userType,
  cardType,
  parentId,
  replies,
  onReply,
}: CommentCardProps) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked === 0 ? false : true);

  // 좋아요 등록/취소 함수
  const handleLike = async () => {
    try {
      await instance.post(`/board/comment/${id}/like`);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error('좋아요 처리에 실패했습니다.', error);
    }
  };
  return (
    <WrapContent $cardType={cardType || ''} $isReply={!!parentId}>
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
        {isPostOwner && (
          <PostOwner>
            <p>작성자</p>
          </PostOwner>
        )}
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
        <div className="bottom-right" onClick={handleLike}>
          <img
            className="like-button"
            src={
              isLiked
                ? cardType === 'dong'
                  ? '/assets/community/like-filled-dong.png'
                  : '/assets/community/like-filled-nari.png'
                : '/assets/community/like-empty.png'
            }
            alt="빈하트"
          />
          <span className="count">{likesCount}</span>
        </div>
      </WrapBottom>

      {replies &&
        replies.map((reply) => (
          <CommentCard
            key={reply.id}
            id={reply.id}
            content={reply.content}
            createdAt={reply.createdAt}
            profile={reply.profile}
            nickname={reply.nickname}
            userType={reply.userType}
            cardType={cardType}
            parentId={reply.parentId}
            likes={reply.likes}
            liked={reply.liked}
            isPostOwner={reply.isPostOwner}
            replies={reply.replies}
            onReply={onReply}
          />
        ))}
    </WrapContent>
  );
};

interface WrapInfoProp {
  $cardType: string;
  $isReply: boolean;
}

const WrapContent = styled.div<WrapInfoProp>`
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
      color: ${({ $cardType }) =>
        $cardType === 'dong'
          ? 'var(--Dong-main, #FF314A)'
          : 'var(--Nari-2, var(--Primary-nari, #ffaa0e))'};
      text-align: right;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.03375rem;
      margin-left: 0.2rem;
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

const PostOwner = styled.div`
  width: 6rem;
  height: 1.875rem;
  border-radius: 0.25rem;
  background: #ffefc1;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: #464646;
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.25rem;
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
