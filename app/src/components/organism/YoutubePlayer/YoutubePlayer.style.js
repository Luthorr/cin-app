import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  gap: 0.5rem;
`;

export const MovieTitle = styled.p`
  font-family: 'Oswald', sans-serif;
  font-size: 3rem;
`;

export const CloseIcon = styled(FaTimes)`
  position: fixed;
  font-size: 3rem;
  top: 10px;
  right: 10px;
  color: var(--contrast);
  transition: all 0.2s ease-in-out;
  &:hover {
    color: var(--white);
  }
`;

export const Player = styled.iframe`
  width: 70%;
  height: 60%;
  border: none;
`;
