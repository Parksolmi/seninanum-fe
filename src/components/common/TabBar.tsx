import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TabMenu from '../../store/TabContext';

interface TabBarProps {
  userType: string;
  getUserType: () => void;
}

const TabBar: React.FC<TabBarProps> = ({ userType, getUserType }) => {
  const { setTabMenuState } = TabMenu((state) => ({
    setTabMenuState: state.setTabMenuState,
  }));

  const handleClick = (tab: number) => {
    setTabMenuState(tab);
    getUserType();
  };

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('/');

  interface MenuItem {
    id: number;
    name: string;
    path: string;
    icon: string;
    iconActive: string;
  }

  const menus: MenuItem[] = [
    {
      id: 0,
      name: '홈',
      path: '/home',
      icon: '/assets/tabIcon/home.svg',
      iconActive: `/assets/tabIcon/home-active-${userType}.svg`,
    },
    {
      id: 1,
      name: '채팅',
      path: '/chat',
      icon: '/assets/tabIcon/chat.svg',
      iconActive: `/assets/tabIcon/chat-active-${userType}.svg`,
    },
    {
      id: 2,
      name: '게시판',
      path: '/community',
      icon: '/assets/tabIcon/community.svg',
      iconActive: `/assets/tabIcon/community-active-${userType}.svg`,
    },
    {
      id: 3,
      name: '내정보',
      path: '/mypage',
      icon: '/assets/tabIcon/mypage.svg',
      iconActive: `/assets/tabIcon/mypage-active-${userType}.svg`,
    },
  ];

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  if (userType === '') {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  return (
    <StyledNav>
      <WrapItem>
        {menus.map((item: MenuItem) => (
          <NavItem
            to={item.path}
            key={item.name}
            onClick={() => handleClick(item.id)}
          >
            <img
              src={currentPage === item.path ? item.iconActive : item.icon}
              alt={item.name}
            />
            <Label
              $active={currentPage === item.path ? 'active' : 'inactive'}
              $type={userType}
            >
              {item.name}
            </Label>
          </NavItem>
        ))}
      </WrapItem>
    </StyledNav>
  );
};

interface LabelProps {
  $active: 'active' | 'inactive';
  $type: string;
}

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  z-index: 9999;
  width: 100%;
  background-color: #fff;
  border-top: #ededed solid 1px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const WrapItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 85px;
  padding: 12px 0;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  height: 100%;
  text-decoration: none;

  img {
    width: 30px;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Label = styled.div<LabelProps>`
  color: ${(props) =>
    props.$active === 'active' ? `var(--Primary-${props.$type})` : 'black'};
  font-size: 1.2rem;
  font-weight: 800;
  white-space: nowrap;
`;

export default TabBar;
