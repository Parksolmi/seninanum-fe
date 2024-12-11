import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  // 검색 결과 필터링
  const filteredBoardList = freeBoardList.filter((free) =>
    free.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PrevHeader
        title={'자유게시판'}
        navigateTo={'/community'}
        isLine={true}
      />
      <WrapInput>
        <input placeholder="제목으로 게시물을 찾아보세요!" />
        <img src="/assets/community/search.png" alt="검색" />
      </WrapInput>
      {filteredBoardList.map((free) => (
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

const WrapInput = styled.div`
  display: flex;
  flex: 1;
  margin: 1.1rem 1.3rem 0 1.3rem;
  align-items: center;

  border-radius: 0.625rem;
  border: 1px solid var(--Base-Gray, #8e8e8e);
  background: #fff;

  input {
    display: flex;
    align-items: center;
    flex: 1;

    padding: 0.5rem 0.5rem 0.3rem 0.5rem;

    flex-shrink: 0;

    border: none;
    border-radius: 0.625rem;

    color: #000;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.03375rem;

    &::placeholder {
      color: #000;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.03375rem;
      opacity: 0.5;
    }
  }

  img {
    width: 1.7rem;
    height: 1.7rem;
  }
`;

export default FreeCommunityPage;
