import React from 'react';
import styled from 'styled-components';

// interface LogoHeaderProps {

// }

const LogoHeader = () => {
  return (
    <WrapLogoHeader>
      <img
        className="logo"
        src="/assets/signIn/seni-text-logo.png"
        alt="logo"
      />
      <AlertButton>
        <img className="alert" src="/assets/common/alert.png" alt="alert" />
      </AlertButton>
    </WrapLogoHeader>
  );
};

const WrapLogoHeader = styled.div`
  padding: 2rem 1.1rem 1.2rem 1.1rem;
  box-shadow: 0px 0px 10.9px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: space-between;
  width: 100%;

  .logo {
    width: 8rem;
  }
  /* 
  .alert {
    width: 1.3rem;
    height: auto;
  } */
`;

const AlertButton = styled.div`
  img {
    width: 1.3rem;
  }
`;

export default LogoHeader;
