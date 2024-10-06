import React, { useEffect } from 'react';
import styled from 'styled-components';
import FileAddButton from '../../components/career/FileAddButton';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useCareerItemState from '../../store/careerItemState';
import CareerDetail from './../../components/common/CareerDetail';
import { calcTotalCareer } from '../../utils/calcTotalCareer';
import { instance } from '../../api/instance';
import CareerAddButton from '../../components/career/CareerAddButton';
import CareerFileBox from '../../components/career/CareerFileBox';
import Modal from '../../components/common/Modal';
import { usePromiseToast } from '../../hooks/useToast';
import HelpBox from '../../components/career/HelpBox';
import useCareerProfileState from '../../store/careerProfileState';
import useModal from '../../hooks/useModal';

interface OutletContext {
  setStatus: (status: number) => void;
}

const RegisterProfileCareerPage = () => {
  const navigate = useNavigate();
  const { careerProfileId } = useParams<{ careerProfileId: string }>();
  const { careers, setCareers } = useCareerItemState();

  const { setStatus } = useOutletContext<OutletContext>();
  const { careerProfileState, calculateProgress } = useCareerProfileState();

  //모달 창
  const {
    openModal: openCareerDeleteModal,
    closeModal: closeCareerDeleteModal,
  } = useModal((id) => (
    <Modal
      userType={'dong'}
      title={'정말 삭제하시겠습니까?'}
      content={``}
      cancelText={'취소'}
      confirmText={'삭제하기'}
      onConfirm={() => handleRemoveCareer(id)}
      onCancel={closeCareerDeleteModal}
    />
  ));

  const {
    openModal: openCertificateDeleteModal,
    closeModal: closeCertificateDeleteModal,
  } = useModal((id) => (
    <Modal
      userType={'dong'}
      title={'정말 삭제하시겠습니까?'}
      content={``}
      cancelText={'취소'}
      confirmText={'삭제하기'}
      onConfirm={handleRemoveCertificate}
      onCancel={closeCertificateDeleteModal}
    />
  ));

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();

  // 경력 항목 삭제
  const handleRemoveCareer = async (profileCareerId: number) => {
    try {
      await instance.delete(`/career/item/${profileCareerId}`);
      alert('항목이 삭제되었습니다.');
      // 경력 삭제 후 목록 업데이트
      const response = await instance.get(`/career`);
      setCareers(response.data.careerItems);
    } catch (error) {
      console.error('경력 항목 삭제 중 에러가 발생했습니다.', error);
    }
  };

  // 경력 증명서 삭제
  const handleRemoveCertificate = async () => {
    try {
      await instance.delete(`/career/certificate/${careerProfileId}`);
      // 증명서 삭제 후 목록 업데이트
      alert('파일이 삭제되었습니다.');
      window.location.reload(); // 페이지 새로고침
    } catch (e) {
      console.log(e);
      alert('파일 삭제 중 오류가 발생했습니다.');
    }
  };

  //  프로필 중간 저장
  const updateProfile = async () => {
    try {
      const res = instance.patch('/career', {
        careerProfileId: careerProfileId,
        progressStep: careerProfileState.progressStep,
        certificateName: careerProfileState.certificateName,
        certificate: careerProfileState.certificate,
      });

      showAutoSaveToast(
        res,
        () => {
          return '자동저장되었습니다.';
        },
        (error) => {
          console.log(error);
          return '자동저장에 실패하였습니다.';
        }
      );
      calculateProgress();
      navigate(`/register/profile/introduction/${careerProfileId}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setStatus(1);
  }, [setStatus]);

  return (
    <>
      <WrapSection>
        <h3>{`동백님의 경력을 알려주세요!`}</h3>
        <TotalCareer>
          <img src="/assets/home/career-profile-dong.svg" alt="프로필이미지" />
          <p>총 경력 {calcTotalCareer(careers)}</p>
        </TotalCareer>
        {careers.map((career) => (
          <CareerDetail
            key={career.careerId}
            title={career.title}
            startYear={career.startYear}
            startMonth={career.startMonth}
            endYear={career.endYear}
            endMonth={career.endMonth}
            content={career.content}
            onDelete={() => openCareerDeleteModal(career.careerId)}
          />
        ))}
        <CareerAddButton
          onClick={() =>
            navigate('/register/profile/career/add', {
              state: { careerProfileId },
            })
          }
          addText={'경력 추가'}
        ></CareerAddButton>
      </WrapSection>
      <LineStyle />
      <WrapSection className="last-content">
        <h3>경력증명서</h3>
        <HelpBox />
        {careerProfileState.certificateName && (
          <CareerFileBox
            activeStatus={careerProfileState.certificate}
            uploadedFileName={careerProfileState.certificateName}
            onDelete={openCertificateDeleteModal}
          />
        )}
        <FileAddButton
          onClick={() =>
            navigate('/register/profile/certificate', {
              state: { careerProfileId },
            })
          }
          addText={'파일 추가'}
        />
      </WrapSection>
      <WrapButtonContainer>
        <Button
          userType={'dong'}
          disabled={false}
          children={'다음'}
          onClick={updateProfile}
        />
      </WrapButtonContainer>
    </>
  );
};
const WrapSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 2rem;
  padding: 1.1rem 1.1rem;

  &.last-content {
    margin-bottom: 8rem;
  }

  h3 {
    font-family: NanumSquare;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.03rem;
    margin: 1rem 0;
  }
`;

const TotalCareer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;

  p {
    color: var(--Primary-dong);
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 600;
    padding: 0.3rem 0 0 0.5rem;
  }
`;

const LineStyle = styled.div`
  position: relative;
  width: 100%;
  height: 0.625rem;
  background: #ebeceb;
  left: 0;
  right: 0;
`;

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 3rem 1.1rem;
`;

export default RegisterProfileCareerPage;
