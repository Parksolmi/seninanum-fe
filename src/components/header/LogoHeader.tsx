import React from 'react';
import styled from 'styled-components';

// interface LogoHeaderProps {

// }

const LogoHeader = () => {
  return <LogoImg src="/assets/common/seni-white-logo.svg" alt="logo" />;
};

const LogoImg = styled.img`
  position: absolute;
  top: 2rem;
  left: 17.6px;
  z-index: 999;
  object-fit: contain;
`;

export default LogoHeader;
