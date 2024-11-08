import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
}

const ViewAdviceBoard = () => {
  const { data: user } = useFetchUserType();
  const { adviceBoardId } = useParams<{ adviceBoardId: string }>();
  const [adviceBoard, setAdviceBoard] = useState<adviceBoard>();
  const [commentContent, setCommentContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글 대상 댓글 ID
  const inputRef = useRef<HTMLInputElement>(null);

  const { comments, fetchComments, addComment } = useComment(
    'adviceBoard',
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

  return (
    <>
      <PrevHeader
        title={'고민상담'}
        navigateTo={'/community/advice'}
        isLine={true}
      />

      <WrapContent>
        <WrapWriter>
          <img className="profile" src={adviceBoard?.profile} alt="프로필" />
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
        답변<p>{adviceBoard?.commentCount}</p>
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

export default ViewAdviceBoard;
