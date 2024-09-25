import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import FileAddButton from '../../components/register/FileAddButton';
import Button from '../../components/common/Button';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import useCareerItemState from '../../store/CareerItemState';
import CareerDetail from './../../components/common/CareerDetail';
import { calcTotalCareer } from '../../utils/calcTotalCareer';
import { instance } from '../../api/instance';
import CareerAddButton from '../../components/register/CareerAddButton';
import CareerFileBox from '../../components/register/CareerFileBox';
import Modal from '../../components/common/Modal';
import { usePromiseToast } from '../../hooks/useToast';

interface OutletContext {
  setStatus: (status: number) => void;
  careerProfileState: {
    progressStep: number;
    fileName: string;
    fileProgress: string;
    // 기타 필요한 상태 값들
  };
  setCareerProfileState: (
    state: Partial<{
      progressStep: number;
      fileName: string;
      fileProgress: string;
      // 기타 필요한 상태 값들
    }>
  ) => void;
  calculateProgress: () => void;
}

const RegisterProfileCareerPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const profileId = pathname.split('/').pop() ?? null;

  const { careers, setCareers } = useCareerItemState();
  const {
    setStatus,
    careerProfileState,
    setCareerProfileState,
    calculateProgress,
  } = useOutletContext<OutletContext>();

  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const cancelModal = () => setIsOpenModal(false);
  const confirmModal = () => {
    handleFileRemove();
  };

  const [fileName, setFileName] = useState<string>(
    careerProfileState.fileName || ''
  );
  const [fileProgress, setFileProgress] = useState(
    careerProfileState.fileProgress || '제출'
  );

  //토스트 메세지
  const { showPromiseToast: showAutoSaveToast } = usePromiseToast();

  const handleRemoveCareer = async (careerId: number) => {
    try {
      await instance.delete(`/career/item`, { data: { careerId } });
    } catch (error) {
      console.error('경력항목 삭제 중 에러가 발생했습니다.', error);
    }
  };

  const updateCareer = async () => {
    try {
      const res = instance.patch('/career', {
        profileId: profileId,
        progressStep: careerProfileState.progressStep,
        fileName: careerProfileState.fileName,
        fileProgress: careerProfileState.fileProgress,
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

  const handleFileUpload = async (file: File) => {
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
  };

  const handleFileRemove = async () => {
    try {
      await instance.delete(`/career/file/${profileId}`);
      setFileName('');
      setFileProgress('');
      alert('파일이 성공적으로 삭제되었습니다.');
      setCareerProfileState({
        progressStep: careerProfileState.progressStep - 1,
      });
    } catch (error) {
      console.error('파일 삭제 중 오류가 발생했습니다.', error);
      alert('파일 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleNextBtn = () => {
    //중간저장
    updateCareer();
    //라우터 이동
    navigate(`/register/profile/introduction/${profileId}`);
  };

  // 컴포넌트 마운트 시 경력 항목 조회
  useEffect(() => {
    const fetchCareerItems = async () => {
      try {
        const response = await instance.get(`/career/item/list/${profileId}`);
        setCareers(response.data);
      } catch (error) {
        console.error('경력 항목 조회 중 에러가 발생했습니다.', error);
      }
    };
    fetchCareerItems();
  }, [profileId]);

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
      />
      <CategoryText>{`동백님의 경력을 알려주세요!`}</CategoryText>
      <TotalCareer>
        <img src="/assets/home/career-profile-dong.svg" alt="프로필이미지" />
        <TotalCareerText>{calcTotalCareer(careers)}</TotalCareerText>
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
          onDelete={() => handleRemoveCareer(career.careerId)}
        />
      ))}
      <ButtonBox onClick={() => navigate(`/register/profile/career/add`)}>
        <CareerAddButton addText={'경력 추가'}></CareerAddButton>
      </ButtonBox>
      <LineStyle />
      <CategoryText>경력증명서</CategoryText>
      <HelpTextBox>
        <HelpText>{`·증빙자료를 첨부하시면 담당자 검토 후,\n확인마크`}</HelpText>
        <img src="/assets/common/certification-mark-dong.svg" alt="확인마크" />
        <HelpText>{`를 달아드려요.\n·첨부한 자료는 나리에게 노출되지 않고,\n담당자만 열람 가능해요.`}</HelpText>
      </HelpTextBox>

      {fileName && (
        <CareerFileBox
          activeStatus={fileProgress}
          uploadedFileName={fileName}
          onDelete={() => setIsOpenModal(true)}
        />
      )}
      <FileAddButton
        onFileUpload={handleFileUpload}
        addText={'파일 추가'}
      ></FileAddButton>
      <GapButton></GapButton>
      <WrapButtonContainer>
        <WrapButton>
          <Button
            userType={'dong'}
            disabled={false}
            children={'다음'}
            onClick={handleNextBtn}
          ></Button>
        </WrapButton>
      </WrapButtonContainer>
    </>
  );
};

const CategoryText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03rem;
  margin-top: 3rem;
  margin-bottom: 1.56rem;
`;

const TotalCareer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

const TotalCareerText = styled.div`
  color: var(--Primary-dong);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 400;
`;

const ButtonBox = styled.div``;

const LineStyle = styled.div`
  width: calc(100% + 2.2rem);
  height: 0.625rem;
  background: #ebeceb;
  position: relative;
  left: -1.1rem;
  margin-top: 3.3rem;
`;

const HelpTextBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 0.625rem;
  border: 1px solid var(--Primary-dong);
  padding: 1.2rem;
`;

const HelpText = styled.span`
  color: var(--Primary-dong);
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-weight: 400;
  white-space: pre;
`;

const GapButton = styled.div`
  margin-bottom: 8rem;
`;

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default RegisterProfileCareerPage;
