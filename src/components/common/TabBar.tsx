import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TabContext } from '../../store/TabContext';

const TabBar: React.FC = () => {
  const { setTabMenuState } = useContext(TabContext);

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('/');

  const handleTabClick = (tab: number) => {
    setTabMenuState(tab);
  };

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
      path: '/',
      icon: '/assets/tabIcon/home.svg',
      iconActive: '/assets/tabIcon/home.svg',
    },
    {
      id: 1,
      name: '채팅',
      path: '/chat',
      icon: '/assets/tabIcon/chat.svg',
      iconActive: '/assets/tabIcon/chat.svg',
    },
    {
      id: 2,
      name: '게시판',
      path: '/community',
      icon: '/assets/tabIcon/community.svg',
      iconActive: '/assets/tabIcon/community.svg',
    },
    {
      id: 3,
      name: '내정보',
      path: '/mypage',
      icon: '/assets/tabIcon/mypage.svg',
      iconActive: '/assets/tabIcon/mypage.svg',
    },
  ];

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <StyledNav>
      <WrapItem>
        {menus.map((item: MenuItem) => (
          <NavItem
            to={item.path}
            key={item.name}
            onClick={() => {
              handleTabClick(item.id);
            }}
          >
            <img
              src={currentPage === item.path ? item.iconActive : item.icon}
              alt={item.name}
            />
            <Label color={currentPage === item.path ? '#FF625D' : '#8E8E8E'}>
              {item.name}
            </Label>
          </NavItem>
        ))}
      </WrapItem>
    </StyledNav>
  );
};

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
  width: 90%;
`;

const NavItem = styled(Link)`
  text-align: center;
  width: 100%;
  padding: 16px 0;
  text-decoration: none;

  img {
    -webkit-tap-highlight-color: transparent;
  }
`;

const Label = styled.div`
  color: ${(props) => props.color};
  font-size: 1rem;
`;

export default TabBar;
