import { instance } from '../api/instance';
import { useCallback, useState } from 'react';

interface Comment {
  id: number;
  profileId: number;
  content: string;
  isSecret: boolean;
  parentId: number | null;
  isPostOwner: boolean;
  isMyComment: boolean;
  likes: number;
  liked: number;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
  replies: Comment[];
}
const useComment = (boardType, postId) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // 댓글 조회
  const fetchComments = useCallback(async () => {
    try {
      const response = await instance.get(
        `/board/${boardType}/${postId}/comments`
      );
      setComments(response.data.comments);
    } catch (err) {
      console.error('댓글 조회 중 에러가 발생했습니다.', err);
    }
  }, [boardType, postId]);

  // 댓글 작성
  const addComment = async (content, isSecret = 0, parentId) => {
    try {
      const response = await instance.post(`/board/${boardType}/${postId}`, {
        content,
        isSecret,
        parentId,
      });
      await fetchComments();
      return response.data;
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId: number) => {
    try {
      await instance.delete(
        `/board/${boardType}/${postId}/comment/${commentId}`
      );
      await fetchComments();
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다.', error);
    }
  };

  return { comments, fetchComments, addComment, deleteComment };
};
export default useComment;
