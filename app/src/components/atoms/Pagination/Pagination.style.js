import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  padding: 2rem 0;
  text-decoration: none;
  transition: background-color 0.3s;
  align-self: center;
`;

export const PaginationElement = styled.a`
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  background-color: ${({ active }) => (active ? '#e3733c' : 'none')};
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? 'none' : '#27292e')};
  }
  border-radius: 4px;
`;
