import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { usePromiseToast } from '../../hooks/useToast';

const ImageView = ({ imgSrc, handleCancel }) => {
  const [showButton, setShowButton] = useState(true);

  const { showPromiseToast: showDownloadImageToast } = usePromiseToast();

  const handleDownload = () => {
    const cloudFrontURL = `${
      process.env.REACT_APP_CLOUDFRONT_URL
    }/${imgSrc.replace(
      `https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/`,
      ''
    )}`;

    try {
      const res = axios.get(cloudFrontURL, { responseType: 'blob' });

      showDownloadImageToast(
        res,
        (res) => {
          const blobURL = URL.createObjectURL(res.data);
          const aTag = document.createElement('a');

          const date = new Date();

          aTag.href = blobURL;
          aTag.download = `시니나눔/${date}.jpg`;

          aTag.click();

          return '이미지가 저장되었습니다.';
        },
        (error) => {
          console.log(error);
          return '이미지 다운로드를 다시 시도해주세요.';
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {showButton && (
        <WrapButtons>
          <div className="container">
            <img
              src="/assets/chat/download-button.svg"
              alt="download"
              onClick={handleDownload}
            />
            <img
              src="/assets/chat/cancel-button.svg"
              alt="download"
              onClick={handleCancel}
            />
          </div>
        </WrapButtons>
      )}
      <Background onClick={() => setShowButton((prev) => !prev)}>
        <WrapImage>
          <img src={imgSrc} alt="view" />
        </WrapImage>
      </Background>
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: black;
  z-index: 999;
`;

const WrapButtons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .container {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
  }
`;

const WrapImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default ImageView;
