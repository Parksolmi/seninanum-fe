import React, { useEffect, useState } from 'react';
import { instance } from '../../api/instance';
import FloatingButton from '../../components/common/FloatingButton';
import FreeBoardCard from '../../components/community/FreeBoardCard';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { parseTime } from '../../utils/formatTime';
import { useNavigate } from 'react-router-dom';

interface freeBoard {
  freeBoardId: number;
  profileId: number;
  title: string;
  content: string;
  image: string;
  likes: number;
  commentCount: number;
  createdAt: string;
  userType: string;
  nickname: string;
  hasImage: boolean;
}
const FreeCommunityPage = () => {
  const navigate = useNavigate();
  const { data: user } = useFetchUserType();
  const [freeBoardList, setFreeBoardList] = useState<freeBoard[]>([]);

  useEffect(() => {
    const fetchFreeBoardList = async () => {
      try {
        const res = await instance.get('/board/free');
        setFreeBoardList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFreeBoardList();
  }, []);

  return (
    <>
      <PrevHeader
        title={'자유게시판'}
        navigateTo={'/community'}
        isLine={true}
      />
      {freeBoardList.map((free) => (
        <FreeBoardCard
          key={free.freeBoardId}
          id={free.freeBoardId}
          title={free.title}
          content={free.content}
          likes={free.likes}
          commentCount={free.commentCount}
          userType={free.userType === 'dong' ? '동백' : '나리'}
          nickname={free.nickname}
          createdAt={parseTime(free.createdAt)}
          hasImage={free.hasImage}
        />
      ))}
      <FloatingButton
        userType={user?.userType}
        onClick={() => navigate('/write/freeboard')}
      />
    </>
  );
};
export default FreeCommunityPage;
