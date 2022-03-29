import styled from 'styled-components';
import { OutlineButton } from '../../atoms/Button/OutlineButton';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
  column-gap: 1rem;
  @media (min-width: 40rem) {
    flex-direction: row;
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
  opacity: 0.7;
  column-gap: 2rem;
`;

export const MovieGenre = styled.p`
  text-transform: uppercase;
`;

export const MovieDescription = styled.p``;

export const MoviePoster = styled.img`
  min-width: 250px;
  height: 100%;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 250/350;
  @media (min-width: 40rem) {
    height: 350px;
    max-width: 300px;
  }
`;

export const RatingsRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

export const RatingText = styled.p`
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
  color: var(--contrast);
  font-size: 1.2rem;
`;

export const RatingsCountText = styled.p`
  opacity: 0.7;
`;

export const AvailableFilmshows = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FilmshowButton = styled(OutlineButton)``;
