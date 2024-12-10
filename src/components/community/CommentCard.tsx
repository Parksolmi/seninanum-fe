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
  isMyComment: boolean;
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
  isMyComment: boolean;
  profile: string;
  nickname: string;
  userType: string;
  cardType: string;
  parentId: number | null;
  replies: Comment[];
  onReply: () => void;
  onDelete: (id) => void;
}

const CommentCard = ({
  id,
  content,
  createdAt,
  likes,
  liked,
  isPostOwner,
  isMyComment,
  profile,
  nickname,
  userType,
  cardType,
  parentId,
  replies,
  onReply,
  onDelete,
}: CommentCardProps) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked === 0 ? false : true);

  const handleToggleDelete = (e: React.MouseEvent) => {
    const deleteButton = (e.target as HTMLElement).nextElementSibling;
    if (deleteButton) {
      deleteButton.classList.toggle('active');
    }
  };
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
        <div className="profile">
          <img src={profile} alt="프로필" />
        </div>
        <WrapInfo>
          <div className="left">
            <div className="nickname">
              {nickname} {userType === 'dong' ? '동백' : '나리'}
            </div>
            <div className="time">{parseTime(createdAt || '')}</div>
          </div>
        </WrapInfo>
        {isPostOwner && (
          <PostOwner $cardType={cardType || ''}>
            <p>작성자</p>
          </PostOwner>
        )}
        {isMyComment && (
          <>
            <img
              className="hamburger"
              src="/assets/community/burger-button-small.svg"
              alt="햄버거버튼"
              onClick={handleToggleDelete}
            />
            <div
              className="del"
              onClick={() => {
                onDelete(id);
              }}
            >
              삭제하기
            </div>
          </>
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
                  ? '/assets/community/like-filled-dong.svg'
                  : '/assets/community/like-filled-nari.svg'
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
            isMyComment={reply.isMyComment}
            replies={reply.replies}
            onReply={onReply}
            onDelete={(replyId) => {
              onDelete(replyId);
            }}
          />
        ))}
    </WrapContent>
  );
};

interface WrapInfoProp {
  $cardType: string;
  $isReply?: boolean;
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
  position: relative;

  .profile {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 50%; /* 원 모양 유지 */
    background: gray; /* 임시 배경 */
    overflow: hidden; /* 내부 이미지가 넘치지 않도록 설정 */
    position: relative;

    img {
      width: 100%; /* 이미지가 컨테이너를 채우도록 설정 */
      height: 100%; /* 이미지가 컨테이너를 채우도록 설정 */
      object-fit: cover; /* 이미지 비율 유지하며 컨테이너에 맞춤 */
      position: absolute; /* 이미지를 컨테이너 안에서 위치 고정 */
      top: 0;
      left: 0;
    }
  }

  .hamburger {
    display: block;
    margin-bottom: auto;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.1rem;
    margin-left: 0.3rem;
  }

  .del {
    display: none;
    z-index: 10;
    position: absolute;
    top: 2rem;
    right: 0;
    width: 8rem;
    height: 2.5rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    line-height: 2.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: '#000';
    font-family: NanumSquare;
    font-size: 1.125rem;
  }

  .del.active {
    display: block;
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

const PostOwner = styled.div<WrapInfoProp>`
  width: 6rem;
  height: 1.875rem;
  border-radius: 0.25rem;
  background: ${({ $cardType }) =>
    $cardType === 'dong' ? '#FFEDF0' : '#ffefc1'};
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: ${({ $cardType }) => ($cardType === 'dong' ? '#FF314A' : '#464646')};
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
