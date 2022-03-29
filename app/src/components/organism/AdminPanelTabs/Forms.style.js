import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  column-gap: 2rem;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

export const Form = styled.form``;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PaginationContainer = styled.div`
  align-self: center;
`;
