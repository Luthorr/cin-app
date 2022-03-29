import React from 'react';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import { Wrapper, MovieImage, Title } from './MoviePoster.style';

const MoviePoster = ({ image, id, title }) => {
  return (
    <ReactLink to={`/movie-details/${id}`}>
      <Wrapper>
        <MovieImage src={image} />
        <Title>{title}</Title>
      </Wrapper>
    </ReactLink>
  );
};

export default MoviePoster;
