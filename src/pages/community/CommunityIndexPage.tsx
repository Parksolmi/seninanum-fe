import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../../components/header/TitleHeader';
import BoothEventBanner from '../../components/community/BoothEventBanner';
import TodayTopicBanner from '../../components/community/TodayTopicBanner';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/instance';

interface freeBoard {
  freeBoardId: number;
  profileId: number;
  title: string;
  content: string;
  image: string;
  likes: number;
  commentCount: number;
  createdAt: Date;
}

interface adviceBoard {
  adviceBoardId: number;
  profileId: number;
  title: string;
  content: string;
  commentCount: number;
  createdAt: Date;
}

const CommunityIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const [freeBoardList, setFreeBoardList] = useState<freeBoard[]>([]);
  const [adviceBoardList, setAdviceBoardList] = useState<adviceBoard[]>([]);

  useEffect(() => {
    const fetchFreeBoardList = async () => {
      try {
        const res = await instance.get('/board/free');
        setFreeBoardList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAdviceBoardList = async () => {
      try {
        const res = await instance.get('/board/advice');
        setAdviceBoardList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFreeBoardList();
    fetchAdviceBoardList();
  }, []);

  return (
    <>
      <TitleHeader title="소통" isShowAlert={true} />
      <WrapBanner>
        <BoothEventBanner />
        <TodayTopicBanner />
      </WrapBanner>
      <SplitLine />

      <WrapCommunity>
        <WrapSingleCommunity>
          <div className="title">
            <h1>자유게시판</h1>
            <p
              className="more-button"
              onClick={() => navigate('/community/free')}
            >
              더보기
            </p>
          </div>
          <div className="content">
            {freeBoardList.map((free) => (
              <p key={free.freeBoardId} className="content-title">
                {free.title}
              </p>
            ))}
          </div>
        </WrapSingleCommunity>
        <SmallSplitLine />
        <WrapSingleCommunity>
          <div className="title">
            <h1>고민상담</h1>
            <p
              className="more-button"
              onClick={() => navigate('/community/advice')}
            >
              더보기
            </p>
          </div>
          <div className="content">
            {adviceBoardList.map((advice) => (
              <p key={advice.adviceBoardId} className="content-title">
                {advice.title}
              </p>
            ))}
          </div>
        </WrapSingleCommunity>
      </WrapCommunity>
    </>
  );
};

const WrapBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.3rem 1.1rem;
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 0 0 1.3rem 0;
`;

const SmallSplitLine = styled.div`
  background: #ebeceb;
  height: 0.2rem;
  margin: 0.5rem 0 0.5rem 0;
`;

const WrapCommunity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.1rem;
`;

const WrapSingleCommunity = styled.div`
  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  h1 {
    color: #000;
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.03rem;
  }

  .more-button {
    color: var(--Base-Deep-Gray, #5b5b5b);
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.03375rem;
    text-decoration-line: underline;
  }

  .content {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .content-title {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.025rem;
  }
`;
export default CommunityIndexPage;
