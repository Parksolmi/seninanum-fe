import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import CommunityInput from '../../components/community/CommunityInput';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { parseTime } from '../../utils/formatTime';
import useComment from '../../hooks/useComment';
import CommentCard from '../../components/community/CommentCard';

interface adviceBoard {
  adviceBoardId: number;
  profileId: number;
  title: string;
  content: string;
  commentCount: number;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
  isMyPost: boolean;
}

const ViewAdviceBoard = () => {
  const { data: user } = useFetchUserType();
  const { adviceBoardId } = useParams<{ adviceBoardId: string }>();
  const [adviceBoard, setAdviceBoard] = useState<adviceBoard>();
  const [commentContent, setCommentContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글 대상 댓글 ID
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { comments, fetchComments, addComment, deleteComment } = useComment(
    'advice',
    adviceBoardId
  );

  useEffect(() => {
    const fetchFreeBoard = async () => {
      const res = await instance.get(`/board/advice/${adviceBoardId}`);
      setAdviceBoard(res.data);
    };

    fetchFreeBoard();
  }, [adviceBoardId]);

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

  // 댓글 삭제
  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
  };

  // 게시글 삭제
  const handleDeletePost = async () => {
    try {
      await instance.delete(`/board/advice/${adviceBoardId}`);
      navigate('/community/advice');
    } catch (error) {
      console.error('게시글 삭제에 실패했습니다.', error);
    }
  };

  return (
    <>
      <PrevHeader
        title={'고민상담'}
        navigateTo={'/community/advice'}
        isLine={true}
        isCommunity={adviceBoard?.isMyPost}
        onDelete={handleDeletePost}
      />

      <WrapContent>
        <WrapWriter>
          <div className="profile">
            <img src={adviceBoard?.profile} alt="프로필" />
          </div>
          <WrapInfo $userType={user?.userType || ''}>
            <div className="left">
              <div className="nickname">
                {adviceBoard?.nickname}{' '}
                {adviceBoard?.userType === 'dong' ? '동백' : '나리'}
              </div>
              <div className="time">
                {parseTime(adviceBoard?.createdAt || '')}
              </div>
            </div>
            <div className="right">
              <div className="chat-button">채팅하기</div>
            </div>
          </WrapInfo>
        </WrapWriter>
        <WrapText>
          <h1 className="title">{adviceBoard?.title}</h1>
          <p>{adviceBoard?.content}</p>
        </WrapText>
      </WrapContent>
      <SplitLine />

      <TotalComment $userType={user?.userType || ''}>
        댓글<p>{adviceBoard?.commentCount}</p>
      </TotalComment>

      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          <CommentCard
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            profile={comment.profile}
            nickname={comment.nickname}
            userType={comment.userType}
            cardType={user?.userType || ''}
            parentId={comment.parentId}
            likes={comment.likes}
            liked={comment.liked}
            isPostOwner={comment.isPostOwner}
            isMyComment={comment.isMyComment}
            replies={comment.replies}
            onReply={() => handleReply(comment.id)} // parentId설정
            onDelete={() => handleDeleteComment(comment.id)}
          />
          {index < comments.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <LastContent />
      <WrapMessageInput>
        <CommunityInput
          ref={inputRef}
          value={commentContent}
          submitHandler={handleCommentSubmit}
          onChangeHandler={(e) => setCommentContent(e.target.value)}
          userType={user?.userType || ''}
          isSecret={isSecret}
          setIsSecret={setIsSecret}
          placeholder={'댓글을 입력해주세요'}
        />
      </WrapMessageInput>
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
    justify-content: center;
    align-items: center;

    border-radius: 0.625rem;
    background: ${({ $userType }) =>
      $userType === 'dong'
        ? 'var(--Dong-main, #FF314A)'
        : 'var(--Nari-1, #FFD111)'};

    width: 5.875rem;
    height: 2.375rem;
    flex-shrink: 0;

    .chat-button {
      color: ${({ $userType }) =>
        $userType === 'dong' ? 'white' : 'var(--Nari-Nari-Text, #464646)'};

      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
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

const WrapMessageInput = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

export default ViewAdviceBoard;
