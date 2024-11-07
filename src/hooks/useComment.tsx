import { instance } from '../api/instance';
import { useState } from 'react';

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
const useComment = (boardType, postId) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // 댓글 조회
  const fetchComments = async () => {
    try {
      const response = await instance.get(
        `/board/${boardType}/${postId}/comments`
      );
      setComments(response.data.comments);
    } catch (err) {
      console.error('댓글 조회 중 에러가 발생했습니다.');
    }
  };

  // 댓글 작성
  const addComment = async (content, isSecret = 0, parentId) => {
    try {
      const response = await instance.post(`/board/${boardType}/${postId}`, {
        content,
        isSecret,
        parentId,
      });
      // 새 댓글 추가 후 fetchComments 호출하여 전체 댓글 업데이트
      await fetchComments();
      return response.data; // 필요 시 호출하는 컴포넌트에서 활용 가능
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  return { comments, fetchComments, addComment };
};
export default useComment;
