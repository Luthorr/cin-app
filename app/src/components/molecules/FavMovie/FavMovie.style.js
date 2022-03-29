import styled from 'styled-components';
import { IoMdStar } from 'react-icons/io';

export const MoviePoster = styled.img`
  min-width: 250px;
  width: 90%;
  height: 100%;
  border-radius: 10px;
  @media (min-width: 40rem) {
    height: 350px;
  }
  transition: all 0.25s ease-in-out;
  filter: brightness(80%);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
  column-gap: 1rem;
  @media (min-width: 40rem) {
    flex-direction: row;
  }
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 1);
    ${MoviePoster} {
      filter: brightness(100%);
    }
  }
`;

export const NarrowerColumn = styled.div`
  display: flex;
  justify-content: center;
`;

export const WiderColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 80%;
`;

export const MovieTitle = styled.h1`
  font-family: 'Oswald', sans-serif;
  letter-spacing: 0.05rem;
`;

export const ShortInfoRow = styled.div`
  display: flex;
  column-gap: 2rem;
  opacity: 0.5;
`;

export const MovieDescription = styled.p`
  opacity: 0.8;
`;

export const RatingsRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

export const RatingsCountText = styled.p`
  opacity: 0.7;
`;

export const StarIcon = styled(IoMdStar)`
  z-index: 1;
  font-size: 2.5rem;
  color: var(--golden);
  transition: opacity, scale 0.15s ease-in-out;
  &:hover {
    opacity: 1;
    scale: 1.1;
  }
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
`;
