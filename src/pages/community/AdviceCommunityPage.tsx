import React, { useEffect, useState } from 'react';
import { instance } from '../../api/instance';
// import styled from 'styled-components';
import FloatingButton from '../../components/common/FloatingButton';
import AdviceBoardCard from '../../components/community/AdviceBoardCard';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { parseTime } from '../../utils/formatTime';

interface adviceBoard {
  adviceBoardId: number;
  profileId: number;
  title: string;
  content: string;
  commentCount: number;
  createdAt: string;
  nickname: string;
  userType: string;
}

const AdviceCommunityPage = () => {
  const { data: user } = useFetchUserType();
  const [adviceBoardList, setAdviceBoardList] = useState<adviceBoard[]>([]);

  useEffect(() => {
    const fetchAdviceBoardList = async () => {
      try {
        const res = await instance.get('/board/advice');
        setAdviceBoardList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdviceBoardList();
  }, []);

  return (
    <>
      <PrevHeader title={'고민상담'} navigateTo={'/community'} isLine={true} />
      {adviceBoardList.map((advice) => (
        <AdviceBoardCard
          key={advice.adviceBoardId}
          id={advice.adviceBoardId}
          title={advice.title}
          content={advice.content}
          commentCount={advice.commentCount}
          createdAt={parseTime(advice.createdAt)}
          userType={user?.userType}
          nickname={advice.nickname}
          writerUserType={advice.userType === 'dong' ? '동백' : '나리'}
        />
      ))}
      <FloatingButton userType={user?.userType} />
    </>
  );
};
export default AdviceCommunityPage;
