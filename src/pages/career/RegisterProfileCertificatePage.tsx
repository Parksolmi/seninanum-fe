import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { instance } from '../../api/instance';
import useCareerProfileState from '../../store/careerProfileState';

const RegisterProfileCertificatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = location.state?.profileId || 0;
  const navigateToRegisterProfile = () => {
    navigate(-1);
  };

  const [file, setFile] = useState<File | null>(null);
  // 파일 상태를 기본값으로 "제출"로 설정
  const [certificate, setCertificate] = useState<string>('제출');
  const { setCareerProfileState } = useCareerProfileState();

  // 파일 선택 시 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  // 숨겨진 input 요소에 대한 참조
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('profileId', profileId);
    // FormData의 모든 값 출력
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      // POST 요청 보내기
      const response = await instance.post('/career/certificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('파일이 성공적으로 업로드되었습니다.');
      setCareerProfileState({
        certificateName: file.name,
        certificate: certificate,
      });
      setCertificate('제출');
      navigate(-1);
      console.log(response.data);
    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다.', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };
  return (
    <WrapContent>
      <form onSubmit={handleSubmit}>
        <WrapCloseIcon onClick={navigateToRegisterProfile}>
          <ClosePage src="/assets/common/page-close.svg" alt="닫기" />
        </WrapCloseIcon>
        <MainText>경력증명서를 등록해주세요!</MainText>
        <SideText>{`대표 경력증명서 하나만 제출해주세요\n부적합할 경우 반려될 수 있어요.`}</SideText>
        <BoxContainer onClick={handleBoxClick}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          {file ? (
            // 파일이 선택된 후 보여줄 UI
            <>
              <ImgArea src="/assets/home/file-icon.svg" alt="파일 아이콘" />
              <FileNameText>{file.name}</FileNameText>
            </>
          ) : (
            // 파일 선택 이전에 보여줄 UI
            <>
              <AddIcon
                src="/assets/home/certificate-add.svg"
                alt="추가아이콘"
              />
              <FileNameText>{'업로드 파일 선택'}</FileNameText>
              <TextStyle>{`PDF 형식의 파일만 업로드 가능합니다.`}</TextStyle>
            </>
          )}
        </BoxContainer>
        <GapButton />
        <WrapButtonContainer>
          <WrapButton>
            <Button
              userType={'dong'}
              disabled={!file}
              children="제출하기"
              type="submit"
            />
          </WrapButton>
        </WrapButtonContainer>
      </form>
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const WrapCloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ClosePage = styled.img`
  margin-top: 0.4rem;
`;

const ImgArea = styled.img`
  display: block;
  margin: auto;
`;

const MainText = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03rem;
  margin-bottom: 1rem;
  white-space: pre-line;
  margin-top: 1.75rem;
`;

const SideText = styled.div`
  color: #393939;
  font-family: NanumSquare;
  font-size: 1.125rem;
  line-height: 1.4375rem;
  white-space: pre;
  letter-spacing: 0.045rem;
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
const BoxContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
  border-radius: 5px;
  background: #f7f8f7;
  position: relative;
`;

const AddIcon = styled.img`
  width: 2.3rem;
  height: 2.3rem;
  display: block;
  margin: auto;
`;

const FileNameText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`;

const TextStyle = styled.div`
  color: #393939;
  text-align: center;
  font-family: NanumSquare;
  font-weight: 400;
  line-height: 1.4375rem; /* 143.75% */
  letter-spacing: 0.04rem;
`;
export default RegisterProfileCertificatePage;
