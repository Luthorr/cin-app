import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Content,
  Icon,
  CloseIcon,
  SidebarLink,
  SidebarMenu,
} from './Sidebar.style';
import { useAuth } from '../../../hooks/useAuth';

const Sidebar = ({ toggleSidebar, isOpen }) => {
  const { user, signOut } = useAuth();
  return (
    <Wrapper isOpen={isOpen}>
      <Icon>
        <CloseIcon onClick={toggleSidebar} />
      </Icon>
      <Content>
        <SidebarMenu onClick={toggleSidebar}>
          <SidebarLink to='/'>Główna</SidebarLink>
          <SidebarLink to='/movies'>Filmy</SidebarLink>
          <SidebarLink to='/filmshows'>Seanse</SidebarLink>
          <SidebarLink to='/news'>News</SidebarLink>
          {user?.role === 2 && (
            <SidebarLink to='/admin-panel'>Panel administracyjny</SidebarLink>
          )}
          {user === null ? (
            <>
              <SidebarLink to='/login'>Zaloguj</SidebarLink>
              <SidebarLink to='/register'>Zarejestruj</SidebarLink>
            </>
          ) : (
            <>
              <SidebarLink to='/profile'>
                <strong>{user.userName}</strong>
              </SidebarLink>
              <SidebarLink to='/my-tickets'>Twoje bilety</SidebarLink>
              <SidebarLink to='/favourite-movies'>Ulubione filmy</SidebarLink>
              <SidebarLink to='/' onClick={signOut}>
                Wyloguj
              </SidebarLink>
            </>
          )}
        </SidebarMenu>
      </Content>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
