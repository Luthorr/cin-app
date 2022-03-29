import styled from 'styled-components';
import { Button } from '../../atoms/Button/Button';

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--secondary);
`;

export const Content = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ShowMore = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding-bottom: 70px;
`;

export const ShowMoreButton = styled(Button)`
  min-width: 180px;
`;

export const H2 = styled.h2`
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.03rem;
  padding-top: 2.5rem;
`;
