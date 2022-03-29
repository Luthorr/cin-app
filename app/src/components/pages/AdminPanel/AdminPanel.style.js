import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 7rem;
  background-color: var(--secondary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 2rem;
  margin: 0 auto;
  column-gap: 3rem;
  row-gap: 5rem;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const Menu = styled.ul`
  width: 15%;
  background-color: var(--primary);
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  border-radius: 5px;
  height: 100%;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const MenuRow = styled.li`
  display: flex;
  width: 100%;
  letter-spacing: 0.1rem;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  column-gap: 1rem;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ isActive }) => isActive && `#e3733c`};
`;

export const WiderColumn = styled.div`
  width: 80%;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const SpinnerContainer = styled.div`
  padding: 8rem 0;
`;
