import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { TransparentRoutes } from '../../../constants';
import { RiArrowDropDownLine } from 'react-icons/ri';

export const Wrapper = styled.nav`
  width: 100%;
  height: 7rem;
  background-color: ${({ isActive, location: { pathname } }) =>
    isActive || !TransparentRoutes.includes(pathname.split('/')[1])
      ? '#1d1e22'
      : 'transparent'}; //
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  color: white;
  z-index: 5;
  transition: background-color 0.15s ease-in-out;
`;

export const BrandLink = styled(Link)`
  padding: 0;
  margin: 0;
`;

export const Logo = styled.img`
  margin: 2rem;
  width: 100px;
  height: 100%;
  padding: 0;
  margin: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-basis: auto;
  width: 100%;
  justify-content: flex-end;
`;

export const Nav = styled.ul`
  display: none;
  @media (min-width: 1020px) {
    display: flex;
    flex-direction: row;
    list-style: none;
    /* justify-content: center;
    align-items: center; */
  }
`;

export const NavItem = styled.li`
  padding: 0 1.5rem;
  user-select: none;
`;

const activeClassName = 'active-link';
export const NavL = styled(NavLink).attrs({ activeClassName })`
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 0.2rem 0;
  font-weight: ${({ highlight }) => highlight && '800'};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: var(--contrast);
  }

  &.${activeClassName} {
    border-bottom: 2px solid var(--contrast);
  }

  text-transform: uppercase;
`;

export const Lin = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 0.2rem 0;
  font-weight: ${({ highlight }) => highlight && '800'};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: var(--contrast);
  }
  text-transform: uppercase;
`;

export const MobileIcon = styled.div`
  display: none;
  @media (max-width: 1019px) {
    display: block;
    width: 50px;
    height: 50px;
    color: white;
    font-size: 3rem;
    margin: 0 30px;
    cursor: pointer;
  }
`;

export const ArrowDown = styled(RiArrowDropDownLine)`
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

export const UserName = styled.strong``;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  padding: 0.5rem 0;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: transparent;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem 0;
  &:hover {
    background-color: var(--primaryLighter);
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${DropdownContent} {
      display: block;
    }
  }
`;
