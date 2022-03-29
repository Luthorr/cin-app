import styled from 'styled-components';

export const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  row-gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 3.5rem;
  row-gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  margin: 2.5rem 0;
`;

export const LegendElement = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.6rem;
  align-items: center;
  justify-content: center;
`;

export const LegendText = styled.p`
  opacity: 0.4;
`;
