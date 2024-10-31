import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdviceBoardCard = ({ userType }) => {
  const navigate = useNavigate();
  return (
    <CardSection onClick={() => navigate('/view/advice/detail')}>
      <WrapCard>
        <h1>부모님 간섭이 너무 심해요.</h1>
        <p className="preview">
          저는 어렸을 때부터 부모님과 사이가 좋은 편이었는데 성인이 된 후 간섭이
          너무 심해져서 갈등이 깊어지고 있습니다.
        </p>
        <div className="bottom-status-bar">
          <WrapComment $userType={userType}>
            <p>답변 10</p>
          </WrapComment>
          <p className="writer">11:24 | 000동백</p>
        </div>
      </WrapCard>
    </CardSection>
  );
};

const CardSection = styled.div`
  padding: 1.3rem 1.1rem;
`;

const WrapCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 1.2rem;

  h1 {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .preview {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.075rem;

    /* 2줄까지만 보이도록 설정 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .writer {
      color: #5b5b5b;
      text-align: right;
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }
`;

interface WrapCommentProps {
  $userType: 'dong' | 'nari';
}

const WrapComment = styled.div<WrapCommentProps>`
  display: flex;
  gap: 1.2rem;
  background: ${({ $userType }) =>
    $userType === 'dong'
      ? 'var(--Dong-main, #FF314A)'
      : 'var(--Nari-1, #ffd111)'};

  padding: 0.5rem;

  color: ${({ $userType }) =>
    $userType === 'dong'
      ? 'var(--White, #FFF)'
      : 'var(--Nari-Nari-Text, #464646)'};

  text-align: center;
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default AdviceBoardCard;
