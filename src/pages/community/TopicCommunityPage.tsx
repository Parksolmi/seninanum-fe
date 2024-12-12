import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import CommunityInput from '../../components/community/CommunityInput';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import useComment from '../../hooks/useComment';
import CommentCard from '../../components/community/CommentCard';
import TodayTopic from '../../components/community/TodayTopic';
import TopicDropdown from '../../components/community/TopicDropDown';

const TopicCommunityPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: user } = useFetchUserType();

  const [list, setList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topicBoardId, setTopicBoardId] = useState(-1);

  const [commentContent, setCommentContent] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const { comments, fetchComments, addComment, deleteComment } = useComment(
    'topic',
    topicBoardId
  );

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    await addComment(commentContent, 0, replyTo);
    setCommentContent('');
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

  const fetchTopicList = async () => {
    try {
      const res = await instance.get('/board/topic');
      setList(res.data); // API에서 받은 데이터로 목록 업데이트
      setTopicBoardId(res.data[0].topicBoardId);
      setSelectedTopic(res.data[0].question);
    } catch (error) {
      console.error('목록 불러오기 실패:', error);
      alert('목록을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchTopicList();
  }, []);

  // 댓글 조회
  useEffect(() => {
    fetchComments(); // topicBoardId가 설정된 후에만 호출
  }, [fetchComments, topicBoardId]);

  return (
    <>
      <PrevHeader
        title={'오늘의 주제'}
        navigateTo={'/community'}
        isLine={true}
      />

      <WrapContent>
        <TopicDropdown
          list={list}
          setSelectedTopic={setSelectedTopic}
          setTopicBoardId={setTopicBoardId}
        />
        <TodayTopic userType={user?.userType || ''} topic={selectedTopic} />
      </WrapContent>
      <CommunityInput
        ref={inputRef}
        value={commentContent}
        submitHandler={handleCommentSubmit}
        onChangeHandler={(e) => setCommentContent(e.target.value)}
        userType={user?.userType || ''}
        secretVisible={false}
        placeholder={'자유롭게 입력해주세요'}
        isBottom={false}
      />

      <SplitLine />

      <TotalComment $userType={user?.userType || ''}>
        댓글<p>{comments.length}</p>
      </TotalComment>
      <WrapComments>
        {[...comments].reverse().map((comment, index) => (
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
              isTodayTopic={true}
            />
            {index < comments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </WrapComments>
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
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

const WrapComments = styled.div`
  margin-bottom: 1rem;
`;

export default TopicCommunityPage;
