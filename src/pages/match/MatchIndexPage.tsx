import React from 'react';
import styled from 'styled-components';
import TitleHeader from '../../components/header/TitleHeader';
import MatchIndexPageDong from './MatchIndexPageDong';
import MatchIndexPageNari from './MatchIndexPageNari';
import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  userType: string;
  career: number;
}

const MatchIndexPage: React.FC = () => {
  const { userType } = useOutletContext<OutletContext>();

  return (
    <>
      {/* 커뮤니티 헤더는 따로 만드는게 나을 듯! */}
      <TitleHeader title="매칭" isShowAlert={true} />
      <WrapContent>
        {userType === 'dong' ? (
          <MatchIndexPageDong userType={userType} />
        ) : (
          <MatchIndexPageNari userType={userType} />
        )}
      </WrapContent>
    </>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default MatchIndexPage;
