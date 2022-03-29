import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--primary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3rem;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  row-gap: 2rem;
`;

export const Row = styled.div`
  display: flex;
  width: 33%;
  align-items: center;
  justify-content: center;
  column-gap: 2rem;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const ContentInColumns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap: 1rem;
  p {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--contrast);
    }
  }
  row-gap: 5rem;
`;

export const Logo = styled.img`
  width: 100px;
`;

export const ContentInRows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1.3rem;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: 2px solid var(--white);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: 0.15s ease-in-out;
  &:hover {
    color: var(--primary);
    background-color: var(--white);
  }
`;
