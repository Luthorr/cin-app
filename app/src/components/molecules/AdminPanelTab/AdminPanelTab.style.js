import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
  column-gap: 2rem;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;
