import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  cursor: pointer;
  border-bottom: ${({ isClicked }) => (isClicked ? 'none' : '2px solid white')};
  padding: 0.5rem 2rem 2rem 2rem;
  margin: 3.5rem 0;
  @media (max-width: 1018px) {
    padding: 0.5rem 1.1rem 1.1rem 1.1rem;
  }
  @media (max-width: 790px) {
    padding: 0.5rem 0.5rem 1.1rem 0.5rem;
  }
  @media (max-width: 790px) {
    padding: 0.5rem 0.5rem 1.1rem 0.5rem;
  }
  @media (max-width: 790px) {
    padding: 0.5rem 0.3rem 1.1rem 0.3rem;
  }
`;

export const Date = styled.div`
  font-weight: bolder;
  font-size: 50px;
  @media (max-width: 790px) {
    font-size: 40px;
  }
  margin-bottom: -20px;
  margin-top: -15px;
  color: ${({ isClicked }) => (isClicked ? '#ff0000' : 'white')};
  transition: all 0.12s ease-in-out;
`;

export const RedDot = styled.span`
  position: absolute;
  top: 0;
  border: 4px solid var(--red);
  display: inline-block;
  border-radius: 50%;
  opacity: 0.85;
`;
