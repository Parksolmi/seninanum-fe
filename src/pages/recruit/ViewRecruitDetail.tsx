import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import Button from '../../components/common/Button';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileCard from '../../components/view/BriefProfileCard';
import { SyncLoader } from 'react-spinners';
import { formatDate } from '../../utils/formatDate';
import { calcAge } from '../../utils/calcAge';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';

interface Recruit {
  profileId: number;
  title: string;
  content: string;
  nickname: string;
  birthyear: string;
  method: string;
  region: string;
  price: number;
  priceType: string;
  gender: string;
  field: string;
  createdAt: string;
  hasApplied: number;
}

const ViewRecruitDetail = () => {
  const { recruitId } = useParams<{ recruitId: string }>();
  const navigate = useNavigate();

  const [recruit, setRecruit] = useState<Recruit | null>(null);
  // 모달 창
  const { openModal: openApplicationModal, closeModal: closeApplicationModal } =
    useModal((id) => (
      <Modal
        userType={'dong'}
        title={'지원하기'}
        content={`나리에게 지원 소식을 전해드려요.\n(동백님의 프로필을 열람할 수 있어요.)`}
        cancelText={'취소'}
        confirmText={'지원하기'}
        onConfirm={() => handleApply(id)}
        onCancel={closeApplicationModal}
      />
    ));
  useEffect(() => {
    if (recruitId) {
      const getRecruitDetail = async () => {
        try {
          const res = await instance.get(`/recruit/${recruitId}`);
          setRecruit(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      getRecruitDetail();
    }
  }, [recruitId]);

  // 지원하기 API 호출 함수
  const handleApply = async (recruitId) => {
    try {
      await instance.post('/application', { recruitId }); // recruitId 전달
      alert('지원이 완료되었습니다.');
      setRecruit(
        (prev) => (prev ? { ...prev, hasApplied: 1 } : prev) // 지원 완료 상태 업데이트
      );
    } catch (error) {
      console.error('지원 중 오류 발생:', error);
      alert('지원 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      {recruit === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-dong)" />
        </WrapLoader>
      ) : (
        <>
          <PrevHeader title={'구인글 조회'} navigateTo={'-1'} />
          <WrapContent>
            <div>
              <TitleText>{recruit.title}</TitleText>
              <ContentText>
                {recruit.content.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </ContentText>
              <UploadTimeText>
                <img src="/assets/common/clock-icon.svg" alt="clock" />
                <p>{formatDate(recruit.createdAt)}</p>
              </UploadTimeText>
            </div>
          </WrapContent>

          <SplitLine />

          <WrapContent>
            <div>
              <TitleText>작성자</TitleText>
              <BriefProfileCard
                type="nari"
                gender={recruit.gender}
                age={calcAge(recruit.birthyear)}
                nickname={recruit.nickname}
                onClick={() =>
                  navigate(`/view/nariprofile/${recruit.profileId}`)
                }
              />
            </div>
            <div className="last-content">
              <TitleText>모집조건</TitleText>
              <ConditionText>
                <tbody>
                  <tr>
                    <th>분야</th>
                    <td>{recruit.field}</td>
                  </tr>
                  <tr>
                    <th>활동방식</th>
                    <td>{recruit.method?.replace('서비스', '')}</td>
                  </tr>
                  {recruit.region !== '' && (
                    <tr>
                      <th>활동지역</th>
                      <td>서울시 {recruit.region}</td>
                    </tr>
                  )}
                  <tr>
                    <th>급여</th>
                    <td>
                      {recruit.priceType} {recruit.price}원
                    </td>
                  </tr>
                </tbody>
              </ConditionText>
            </div>
            {recruit.hasApplied === 0 ? (
              <WrapButton>
                <Button
                  disabled={false}
                  userType={'dong'}
                  // 임시
                  onClick={() => openApplicationModal(recruitId)}
                >
                  지원하기
                </Button>
              </WrapButton>
            ) : (
              <WrapButton>
                <Button disabled={true} userType={'dong'}>
                  이미 지원한 공고입니다.
                </Button>
              </WrapButton>
            )}
          </WrapContent>
        </>
      )}
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1.1rem;
  margin: 1.5rem 0;

  .last-content {
    margin-bottom: 7rem;
  }
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
  background-color: white;
`;

const WrapLoader = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ViewRecruitDetail;
