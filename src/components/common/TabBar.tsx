import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tabMenu from '../../store/tabContext';
import userTypeStore from '../../store/userState';
import { instance } from '../../api/instance';

interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon: string;
  iconActive: string;
}

const TabBar = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('/');
  const { userType, setProfileStep, setUserType } = userTypeStore();

  // 유저 타입 가져오기
  const getUserType = useCallback(async () => {
    try {
      const res = await instance.get('/user/userType');
      setUserType(res.data.userType);
      setProfileStep(res.data.career);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { setTabMenuState } = tabMenu((state) => ({
    setTabMenuState: state.setTabMenuState,
  }));

  const handleClick = (tab: number) => {
    setTabMenuState(tab);
    getUserType();
  };

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

  useEffect(() => {
    getUserType();
  }, [getUserType]);

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
  padding-bottom: 0.8rem;
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
    props.$active === 'active'
      ? `var(--Primary-${props.$type})`
      : 'var(--Base-Gray-3)'};
  font-size: 1.2rem;
  font-family: NanumSquare;
  font-weight: 700;
  white-space: nowrap;
`;

export default TabBar;
