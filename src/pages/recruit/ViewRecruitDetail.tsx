import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileCard from '../../components/view/BriefProfileCard';

const ViewRecruitDetail = () => {
  const navigate = useNavigate();

  return (
    <>
      <WrapContent>
        <PrevHeader
          title={'구인글 조회'}
          navigateTo={() => navigate('/view/recruit/list')}
        />
        <div>
          <TitleText>
            기후기술 창업대회 공모전 피드백 및 도와주실 전문가님 구합니다!
          </TitleText>
          <ContentText>
            환경 문제를 어떻게 하면 기후기술로 녹여낼지가 고민입니다. 격주
            수요일 저녁에 만나서 피드백 받는 시간을 갖고 싶습니다. 최대한
            환경부나, 환경 기술에 대한 박식한 지식을 가지고 계신 어른분이면 좋을
            것 같습니다. 저희 팀원은 총 5명이고, 동작구 소재의 대학교를 다니고
            있습니다.
          </ContentText>
          <UploadTimeText>
            <img src="/assets/common/clock-icon.svg" alt="clock" />
            <p>06.17 23:09</p>
          </UploadTimeText>
        </div>
      </WrapContent>

      <SplitLine />

      <WrapContent>
        <div>
          <TitleText>작성자</TitleText>
          <BriefProfileCard type="nari" userInfo={['여성', '20대']} />
        </div>
        <div>
          <TitleText>모집조건</TitleText>
          <ConditionText>
            <tbody>
              <tr>
                <th>분야</th>
                <td>교육</td>
              </tr>
              <tr>
                <th>활동방식</th>
                <td>대면</td>
              </tr>
              <tr>
                <th>활동지역</th>
                <td>서울시 동작구</td>
              </tr>
              <tr>
                <th>급여</th>
                <td>건당 10000원</td>
              </tr>
            </tbody>
          </ConditionText>
        </div>
        <WrapButton>
          <Button
            disabled={false}
            type={'dong'}
            // 임시
            onClick={() => navigate('/home')}
          >
            지원하기
          </Button>
        </WrapButton>
      </WrapContent>
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1.1rem;
  margin-bottom: 1.5rem;
`;

const TitleText = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.3;
  font-family: NanumSquare;
  margin-bottom: 0.5rem;
`;
const ContentText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-top: 1rem;
`;
const UploadTimeText = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

const ConditionText = styled.table`
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;

  th,
  td {
    padding-right: 20px;
    font-family: NanumSquare;
    font-size: 1.25rem;
  }

  th {
    color: #5b5b5b;
    font-weight: 700;
  }

  td {
    font-weight: 400;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.2rem 0;
`;

const WrapButton = styled.div`
  position: fixed;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1.5rem;
`;

export default ViewRecruitDetail;
