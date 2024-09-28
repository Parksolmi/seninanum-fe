import React from 'react';
import styled from 'styled-components';

const HelpBox = () => {
  return (
    <HelpTextBox>
      <li>
        증빙자료를 첨부하시면 관리자가 검토 후, <br />
        확인마크
        <img src="/assets/common/certification-mark-dong.svg" alt="확인마크" />
        를 달아드려요.
      </li>
      <li>첨부한 자료는 외부에 노출되지 않고, 관리자만 열람 가능해요.</li>
    </HelpTextBox>
  );
};

const HelpTextBox = styled.ul`
  width: 100%;
  height: auto;
  border-radius: 0.625rem;
  border: 1px solid var(--Primary-dong);
  padding: 1.2rem 1.2rem 1.2rem 2rem;
  list-style-type: disc;
  list-style-position: outside;
  color: var(--Primary-dong);

  li {
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 400;
    white-space: pre-wrap;
    line-height: normal;
  }
`;

export default HelpBox;
