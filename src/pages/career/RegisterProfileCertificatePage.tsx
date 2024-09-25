import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';

const RegisterProfileCertificatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = location.state?.profileId || 0;
  const navigateToRegisterProfile = () => {
    navigate(-1);
  };
  const addCertificate = () => {};
  return (
    <WrapContent>
      <WrapCloseIcon>
        <ClosePage
          src="/assets/common/page-close.svg"
          onClick={navigateToRegisterProfile}
        ></ClosePage>
      </WrapCloseIcon>
      <div>
        <MainText>경력증명서를 등록해주세요!</MainText>
        <SideText>{`대표 경력증명서 하나만 제출해주세요\n부적합할 경우 반려될 수 있어요.`}</SideText>
        {/*<Input
          inputPlaceholder="회사명을 입력하세요."
          onChange={handleOnChange}
          maxLength={50}
          name="title"
        ></Input>*/}
        <BoxContainer>
          {/* 파일 선택 이전 */}

          <AddIcon
            src="/assets/home/certificate-add.svg"
            alt="추가아이콘"
          ></AddIcon>
          <FileNameText>{'업로드 파일 선택'}</FileNameText>
          <TextStyle>{`PDF 형식의 파일만 업로드 가능합니다.)`}</TextStyle>

          {/* 파일 선택 이후 */}
          {/*<ImgArea src="/assets/home/file-icon.svg" />*/}
          {/*<FileNameText>{'카카오모빌리티'}</FileNameText>*/}
        </BoxContainer>
        <GapButton />
        <WrapButtonContainer>
          <WrapButton>
            <Button
              userType={'dong'}
              disabled={true}
              children="제출하기"
              onClick={addCertificate}
            ></Button>
          </WrapButton>
        </WrapButtonContainer>
      </div>
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
