import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import FileAddButton from '../../components/career/FileAddButton';
import Button from '../../components/common/Button';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import useCareerItemState from '../../store/careerItemState';
import CareerDetail from './../../components/common/CareerDetail';
import { calcTotalCareer } from '../../utils/calcTotalCareer';
import { instance } from '../../api/instance';
import CareerAddButton from '../../components/career/CareerAddButton';
import CareerFileBox from '../../components/career/CareerFileBox';
import Modal from '../../components/common/Modal';
import { usePromiseToast } from '../../hooks/useToast';
import HelpBox from '../../components/career/HelpBox';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfileState: {
    progressStep: number;
    certificateName: string;
    certificate: string;
    // 기타 필요한 상태 값들
  };
  setCareerProfileState: (
    state: Partial<{
      progressStep: number;
      certificateName: string;
      certificate: string;
      // 기타 필요한 상태 값들
    }>
  ) => void;
  calculateProgress: () => void;
}

const RegisterProfileCareerPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const profileId = pathname.split('/').pop() ?? null;
  const [careerId, setCareerId] = useState<number>(0);
  const { careers, setCareers } = useCareerItemState();
  const {
    setStatus,
    careerProfileState,
    // setCareerProfileState,
    calculateProgress,
  } = useOutletContext<OutletContext>();

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();

  // 경력 항목 조회 함수
  const fetchCareerItems = useCallback(async () => {
    try {
      const response = await instance.get(`/career/item/list/${profileId}`);
      setCareers(response.data);
    } catch (error) {
      console.error('경력 항목 조회 중 에러가 발생했습니다.', error);
    }
  }, [profileId, setCareers]);

  // 컴포넌트 마운트 시 경력 항목 조회
  useEffect(() => {
    fetchCareerItems();
  }, [fetchCareerItems]);

  const handleRemoveCareer = async (careerId: number) => {
    try {
      await instance.delete(`/career/item`, { data: { careerId } });
      // 경력 삭제 후 목록 다시 조회
      await fetchCareerItems();
    } catch (error) {
      console.error('경력 항목 삭제 중 에러가 발생했습니다.', error);
    }
  };

  const handleAddCareer = () => {
    navigate('/register/profile/career/add', { state: { profileId } });
  };
  const handleAddCertificate = () => {
    navigate('/register/profile/certificate', { state: { profileId } });
  };
  const updateCareer = async () => {
    try {
      const res = instance.patch('/career', {
        profileId: profileId,
        progressStep: careerProfileState.progressStep,
        certificateName: careerProfileState.certificateName,
        certificate: careerProfileState.certificate,
      });

      showAutoSaveToast(
        res,
        (res) => {
          return '자동저장되었습니다.';
        },
        (error) => {
          console.log(error);
          return '자동저장에 실패하였습니다.';
        }
      );
      calculateProgress();
    } catch (e) {
      console.log(e);
    }
  };

  /*const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await instance.post('/career/certificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('파일이 성공적으로 업로드되었습니다.');
      // 파일명 설정
      setFileName(file.name);
      // 파일 프로그레스바 설정
      setFileProgress(fileProgress);
    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다.', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };*/

  // const handleFileRemove = async () => {
  //   try {
  //     await instance.delete(`/career/file/${profileId}`);
  //     setFileName('');
  //     setFileProgress('');
  //     alert('파일이 성공적으로 삭제되었습니다.');
  //     setCareerProfileState({
  //       progressStep: careerProfileState.progressStep - 1,
  //     });
  //   } catch (error) {
  //     console.error('파일 삭제 중 오류가 발생했습니다.', error);
  //     alert('파일 삭제 중 오류가 발생했습니다.');
  //   }
  // };

  const handleNextBtn = () => {
    // 경력증명서 상태를 검토로 바꿈
    // if (
    //   careerProfileState.certificate === '제출'
    //     ? setCareerProfileState({ certificate: '검토' })
    //     : ''
    // )

    //중간저장
    updateCareer();
    //라우터 이동
    navigate(`/register/profile/introduction/${profileId}`);
  };
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const cancelModal = () => setIsOpenModal(false);
  const removeCareer = (careerId) => {
    setIsOpenModal(true);
    setCareerId(careerId);
  };
  const confirmModal = () => {
    handleRemoveCareer(careerId);
    setIsOpenModal(false);
  };

  useEffect(() => {
    setStatus(1);
  }, [setStatus]);

  return (
    <>
      <Modal
        userType={'dong'}
        isOpen={isModalOpen}
        title={'정말 삭제하시겠습니까?'}
        content={``}
        cancelText={'취소'}
        confirmText={'삭제하기'}
        confirmModal={confirmModal}
        cancelModal={cancelModal}
      />{' '}
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
            onDelete={() => removeCareer(career.careerId)}
          />
        ))}
        <CareerAddButton
          onClick={handleAddCareer}
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
            onDelete={() => setIsOpenModal(true)}
          />
        )}
        <FileAddButton onClick={handleAddCertificate} addText={'파일 추가'} />
      </WrapSection>
      <WrapButtonContainer>
        <Button
          userType={'dong'}
          disabled={false}
          children={'다음'}
          onClick={handleNextBtn}
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
