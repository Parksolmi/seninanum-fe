import React from 'react';
import styled from 'styled-components';
import CommunityIndexPageDong from './CommunityIndexPageDong';
import CommunityIndexPageNari from './CommunityIndexPageNari';
import TitleHeader from '../../components/header/TitleHeader';
import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  userType: string;
  career: number;
}

const CommunityIndexPage: React.FC = () => {
  const { userType } = useOutletContext<OutletContext>();

  return (
    <>
      {/* 커뮤니티 헤더는 따로 만드는게 나을 듯! */}
      <TitleHeader title="커뮤니티" isShowAlert={true} />
      <WrapContent>
        {userType === 'dong' ? (
          <CommunityIndexPageDong />
        ) : (
          <CommunityIndexPageNari />
        )}
      </WrapContent>
    </>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default CommunityIndexPage;
