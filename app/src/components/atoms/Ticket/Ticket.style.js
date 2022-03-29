import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export const TicketContent = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  align-items: center;
  column-gap: 1rem;
`;

export const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.5rem;
`;
export const TicketValue = styled.p`
  font-weight: 600;
  font-size: 2rem;
`;

export const TicketLabel = styled.p``;

export const QuitIcon = styled(FaTimes)`
  font-size: 1.5rem;
  opacity: 0.4;
  cursor: pointer;
`;
