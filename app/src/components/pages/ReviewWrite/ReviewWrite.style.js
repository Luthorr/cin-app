import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 7rem;
  background-color: var(--secondary);
`;

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
  row-gap: 0.5rem;
`;

export const Heading = styled.h2`
  text-transform: uppercase;
`;

export const MovieName = styled.span`
  color: var(--contrast);
  font-weight: 600;
`;
