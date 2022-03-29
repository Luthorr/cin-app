import styled from 'styled-components';
import { IoMdPlay } from 'react-icons/io';

export const ShadowButton = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: whitesmoke;
  opacity: 0.2;
  padding: 3.5rem;
  transition: all 0.1s ease-in-out;
`;

export const PlayIcon = styled(IoMdPlay)`
  font-size: 2rem;
  color: var(--contrast);
  margin-left: 5px;
  transition: all 0.1s ease-in-out;
`;

export const Wrapper = styled.div`
  border-radius: 50%;
  padding: 1.5rem;
  background-color: var(--white);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    ${ShadowButton} {
      padding: 0;
    }

    ${PlayIcon} {
      color: var(--white);
    }
    background-color: var(--contrast);
  }
`;
