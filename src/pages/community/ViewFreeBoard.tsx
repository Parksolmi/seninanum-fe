import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import CommunityInput from '../../components/community/CommunityInput';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { parseTime } from '../../utils/formatTime';
import CommentCard from '../../components/community/CommentCard';
import useComment from '../../hooks/useComment';

interface freeBoard {
  freeBoardId: number;
  profileId: number;
  title: string;
  content: string;
  image: string;
  likes: number;
  commentCount: number;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
}

const ViewFreeBorad = () => {
  const { data: user } = useFetchUserType();
  const { freeBoardId } = useParams<{ freeBoardId: string }>();
  const [freeBoard, setFreeBoard] = useState<freeBoard>();
  const [commentContent, setCommentContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글 대상 댓글 ID
  const inputRef = useRef<HTMLInputElement>(null);

  const { comments, fetchComments, addComment } = useComment(
    'free',
    freeBoardId
  );

  useEffect(() => {
    const fetchFreeBoard = async () => {
      const res = await instance.get(`/board/free/${freeBoardId}`);
      setFreeBoard(res.data);
    };

    fetchFreeBoard();
  }, [freeBoardId]);

  const imgArray = freeBoard?.image ? freeBoard.image.split(',') : [];

  // 댓글 조회
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    await addComment(commentContent, isSecret ? 1 : 0, replyTo);
    setCommentContent('');
    setIsSecret(false);
    setReplyTo(null);
  };

  // 답글쓰기 버튼 클릭 시 입력창에 포커스
  const handleReply = (commentId: number) => {
    setReplyTo(commentId);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <PrevHeader
        title={'자유게시판'}
        navigateTo={'/community/free'}
        isLine={true}
      />
      <WrapContent>
        <WrapWriter>
          <img className="profile" src={freeBoard?.profile} alt="프로필" />
          <WrapInfo $userType={user?.userType || ''}>
            <div className="left">
              <div className="nickname">
                {freeBoard?.nickname}{' '}
                {freeBoard?.userType === 'dong' ? '동백' : '나리'}
              </div>
              <div className="time">
                {parseTime(freeBoard?.createdAt || '')}
              </div>
            </div>
            <div className="right">
              <img
                className="like-button"
                src="/assets/community/like-empty.png"
                alt="빈하트"
              />
              <p className="count">{freeBoard?.likes}</p>
            </div>
          </WrapInfo>
        </WrapWriter>
        <WrapText>
          <h1 className="title">{freeBoard?.title}</h1>
          <p>{freeBoard?.content}</p>
        </WrapText>
        {imgArray.length > 0 && (
          <WrapImage>
            {imgArray.map((img, index) => (
              <img key={index} src={img} alt="이미지" />
            ))}
          </WrapImage>
        )}
      </WrapContent>
      <SplitLine />

      <TotalComment $userType={user?.userType || ''}>
        댓글<p>{freeBoard?.commentCount}</p>
      </TotalComment>

      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          <CommentCard
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            profile={comment.profile}
            nickname={comment.nickname}
            userType={comment.userType}
            parentId={comment.parentId}
            replies={comment.replies}
            onReply={() => handleReply(comment.id)} // parentId설정
          />
          {index < comments.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <LastContent />
      <CommunityInput
        ref={inputRef}
        value={commentContent}
        submitHandler={handleCommentSubmit}
        onChangeHandler={(e) => setCommentContent(e.target.value)}
        userType={user?.userType || ''}
        isSecret={isSecret}
        setIsSecret={setIsSecret}
      />
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
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

interface WrapInfoProp {
  $userType: string;
}

const WrapInfo = styled.div<WrapInfoProp>`
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

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

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
`;

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h1 {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.075rem;
  }
`;

const WrapImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  img {
    /* width: 20rem;
    height: 20rem; */
    object-fit: cover;
    flex-shrink: 0;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 0 0 1.3rem 0;
`;

interface TotalCommentProp {
  $userType: string;
}
const TotalComment = styled.div<TotalCommentProp>`
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  p {
    margin-left: 0.38rem;
    color: ${({ $userType }) => ($userType === 'dong' ? '#FF314A' : '#ffaa0e')};
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
  }
`;

const Divider = styled.div`
  border-top: 1.5px solid #ebeceb;
  width: 93%;
  height: 0rem;
  margin: auto;
  align-items: center;
`;

const LastContent = styled.div`
  display: flex;
  margin-bottom: 120px;
`;

export default ViewFreeBorad;
