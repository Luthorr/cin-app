import styled from 'styled-components';

export const Wrapper = styled.button`
  min-width: 15%;
  border: 2px solid var(--contrast);
  border-radius: 35px 0 35px 0;
  padding: 2rem;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  text-align: center;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--primaryLighter);
    border: 2px solid var(--contrastDarker);
  }
`;

export const PlaydateDay = styled.p`
  font-weight: 600;
  color: var(--contrast);
`;

export const PlaydateHour = styled.p`
  font-weight: 600;
  color: var(--contrast);
`;

export const RoomName = styled.p`
  font-weight: 800;
`;
