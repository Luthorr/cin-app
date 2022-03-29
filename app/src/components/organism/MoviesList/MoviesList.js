import React from 'react';
import MoviesGrid from '../../molecules/MoviesGrid/MoviesGrid';
import { OrangeLine } from '../../atoms/Lines/Lines';
import {
  Content,
  Wrapper,
  ShowMore,
  ShowMoreButton,
  H2,
} from './MoviesList.style';
import MoviePoster from '../../molecules/MoviePoster/MoviePoster';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const MoviesList = ({ playedMovies }) => {
  return (
    <Wrapper>
      <Content>
        <H2>Premierowo wystawiamy</H2>
        <OrangeLine />
        <MoviesGrid>
          {playedMovies.map(({ posterImage, title, id }, index) => (
            <MoviePoster
              key={index}
              image={posterImage}
              title={title}
              id={id}
            />
          ))}
        </MoviesGrid>
        <ShowMore>
          <OrangeLine />
          <ReactLink to='/movies'>
            <ShowMoreButton type='button'>Zobacz więcej</ShowMoreButton>
          </ReactLink>
        </ShowMore>
      </Content>
    </Wrapper>
  );
};

export default MoviesList;
