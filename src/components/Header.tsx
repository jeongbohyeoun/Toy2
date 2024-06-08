import { Link } from 'react-router-dom';
import SignOut from '@/components/SignOut';
import styled from 'styled-components';
import logo from '@/assets/images/logo.svg';
import iconMenu from '@/assets/images/icon-menu.svg';
import iconClose from '@/assets/images/icon-close.svg';
import { device } from '@/styles/media';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavContainer>
        <LogoLink to="/calendar">
          <LogoImage src={logo} alt="health calendar" />
        </LogoLink>
        <DesktopNavList>
          <li>
            <NavLink to="/mypage">마이페이지</NavLink>
          </li>
          <li>
            <NavLink to="/apply">PT 신청</NavLink>
          </li>
          <li>
            <NavLink to="/applyList">PT 신청내역</NavLink>
          </li>
        </DesktopNavList>
        <LogoutBox>
          <SignOut />
        </LogoutBox>
        <MobileMenuIcon onClick={toggleMenu}>
          {isOpen ? <CloseIcon src={iconClose} alt="닫기 이미지" /> : <MenuIcon src={iconMenu} alt="메뉴 이미지" />}
        </MobileMenuIcon>
      </NavContainer>
      {isOpen && (
        <MobileNavList>
          <li>
            <NavLink to="/mypage" onClick={toggleMenu}>
              마이페이지
            </NavLink>
          </li>
          <li>
            <NavLink to="/apply" onClick={toggleMenu}>
              PT 신청
            </NavLink>
          </li>
          <li>
            <NavLink to="/applyList" onClick={toggleMenu}>
              PT 신청내역
            </NavLink>
          </li>
          <MobileLogoutBox onClick={toggleMenu}>
            <SignOut />
          </MobileLogoutBox>
        </MobileNavList>
      )}
    </>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 8rem;
  padding: 0 8rem;
  color: var(--color-gray-dark);
  box-shadow: 0 0 1.5rem 0.5rem rgba(0, 0, 0, 0.03);
  background-color: var(--color-white);

  @media ${device.desktop} {
    padding: 0 3rem;
  }

  @media ${device.tablet} {
    height: 6rem;
    padding: 0 3rem;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: 6rem;
  height: auto;

  @media ${device.tablet} {
    width: 4rem;
  }
`;

const DesktopNavList = styled.ul`
  display: flex;
  align-items: center;
  margin-right: auto;
  padding-left: 12rem;
  gap: 10rem;

  @media ${device.desktop} {
    padding-left: 6rem;
    gap: 5rem;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.8rem;
  color: var(--color-gray-dark);
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: var(--color-primary);
  }
`;

const LogoutBox = styled.div`
  color: var(--color-primary);
  font-weight: 700;

  @media ${device.tablet} {
    display: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
    cursor: pointer;
  }
`;

const CloseIcon = styled.img`
  width: 2.4rem;
`;

const MenuIcon = styled.img`
  width: 2.4rem;
`;

const MobileNavList = styled.ul`
  display: none;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 6rem;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 2rem 0;
  background-color: var(--color-white);
  box-shadow: 0 1rem 1.5rem 0 rgba(0, 0, 0, 0.03);

  li {
    padding: 0.8rem 0;
  }

  @media ${device.tablet} {
    display: flex;
  }
`;

const MobileLogoutBox = styled.div`
  margin-top: 1rem;
  color: var(--color-primary);
  font-weight: 700;
`;

export default Header;
