import React, { useEffect } from 'react';
import styled from 'styled-components';
import FileAddButton from '../../components/career/FileAddButton';
import Button from '../../components/common/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CareerDetail from './../../components/common/CareerDetail';
import { calcTotalCareer } from '../../utils/calcTotalCareer';
import { instance } from '../../api/instance';
import CareerAddButton from '../../components/career/CareerAddButton';
import CareerFileBox from '../../components/career/CareerFileBox';
import Modal from '../../components/common/Modal';
import { usePromiseToast } from '../../hooks/useToast';
import HelpBox from '../../components/career/HelpBox';
import useModal from '../../hooks/useModal';
import { useUpdateCareerProfile } from '../../hooks/useUpdateCareerProfile';
import { CareerProfile } from '../../interface/careerProfileInterface';
import { useQueryClient } from 'react-query';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfile: CareerProfile;
}

const RegisterProfileCareerPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { careerProfileId } = useParams<{ careerProfileId: string }>();
  const { setStatus, careerProfile } = useOutletContext<OutletContext>();
  const { updateProfile } = useUpdateCareerProfile(careerProfileId);

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
      // 삭제 후 쿼리를 무효화하여 최신 데이터를 다시 가져오도록 설정
      queryClient.invalidateQueries('fetchCareerProfileKey');
    } catch (error) {
      console.error('경력 항목 삭제 중 에러가 발생했습니다.', error);
    }
  };

  // 경력 증명서 삭제
  const handleRemoveCertificate = async () => {
    try {
      await instance.delete(`/career/certificate/${careerProfileId}`);
      alert('파일이 삭제되었습니다.');
      // 삭제 후 쿼리를 무효화하여 최신 데이터를 다시 가져오도록 설정
      queryClient.invalidateQueries('fetchCareerProfileKey');
    } catch (e) {
      console.log(e);
      alert('파일 삭제 중 오류가 발생했습니다.');
    }
  };

  const hanldeNextButton = () => {
    showAutoSaveToast(
      updateProfile(),
      () => '자동 저장되었습니다.',
      (error) => {
        console.log(error);
        return '자동 저장에 실패하였습니다.';
      }
    );
    navigate(`/register/profile/introduction/${careerProfileId}`);
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
          <p>
            총 경력{' '}
            {careerProfile ? calcTotalCareer(careerProfile.careerItemList) : 0}
          </p>
        </TotalCareer>
        {careerProfile?.careerItemList.map((career) => (
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
        />
      </WrapSection>
      <LineStyle />
      <WrapSection className="last-content">
        <h3>경력증명서</h3>
        <HelpBox />
        {careerProfile?.certificateName && (
          <CareerFileBox
            activeStatus={careerProfile.certificateStatus}
            uploadedFileName={careerProfile.certificateName}
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
          onClick={hanldeNextButton}
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
