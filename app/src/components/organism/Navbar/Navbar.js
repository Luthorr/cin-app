import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import {
  Wrapper,
  Logo,
  Content,
  Nav,
  NavItem,
  NavL,
  MobileIcon,
  BrandLink,
  Lin,
  UserName,
  Dropdown,
  DropdownContent,
  DropdownItem,
} from './Navbar.style';
import cinema from '../../../images/cinema.png';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const changeNavbarColor = () => {
    if (window.scrollY > 50) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    const listener = window.addEventListener('scroll', changeNavbarColor);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);
  const [isActive, setIsActive] = useState(false);
  return (
    <Wrapper isActive={isActive} location={location}>
      <BrandLink to='/'>
        <Logo src={cinema} />
      </BrandLink>
      <Content>
        <Nav>
          <NavItem>
            <NavL to='/' exact>
              GŁÓWNA
            </NavL>
          </NavItem>
          <NavItem>
            <NavL to='/movies'>FILMY</NavL>
          </NavItem>
          <NavItem>
            <NavL to='/filmshows'>SEANSE</NavL>
          </NavItem>
          <NavItem>
            <NavL to='/news'>NEWS</NavL>
          </NavItem>
          {user === null ? (
            <>
              <NavItem>
                <NavL highlight='true' to='/login'>
                  ZALOGUJ
                </NavL>
              </NavItem>
              <NavItem>
                <NavL highlight='true' to='/register'>
                  ZAREJESTRUJ
                </NavL>
              </NavItem>
            </>
          ) : (
            <>
              {user.role === 2 && (
                <NavItem>
                  <NavL to='/admin-panel'>
                    <strong>Panel administracyjny</strong>
                  </NavL>
                </NavItem>
              )}
              <NavItem>
                <Dropdown>
                  <NavL to='/profile'>
                    <UserName>
                      <strong>{user.userName}</strong>
                    </UserName>
                  </NavL>
                  <DropdownContent>
                    <ReactLink to={'/my-tickets'}>
                      <DropdownItem>Twoje bilety</DropdownItem>
                    </ReactLink>
                    <ReactLink to={'/favourite-movies'}>
                      <DropdownItem>Ulubione filmy</DropdownItem>
                    </ReactLink>
                  </DropdownContent>
                </Dropdown>
              </NavItem>
              <NavItem>
                <Lin to='/' onClick={signOut}>
                  Wyloguj
                </Lin>
              </NavItem>
            </>
          )}
        </Nav>
      </Content>
      <MobileIcon onClick={toggleSidebar}>
        <FiMenu />
      </MobileIcon>
    </Wrapper>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
