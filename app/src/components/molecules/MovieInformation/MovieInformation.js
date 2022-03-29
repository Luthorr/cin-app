import React from 'react';
import {
  Content,
  Poster,
  MovieDetails,
  AdditionalInformations,
  Clock,
  Star,
  Title,
  ShowMoreButton,
} from './MovieInformation.style';
import { useStringFormatter } from '../../../hooks/useStringFormatter';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const MovieInformation = ({
  movie: {
    id,
    posterImage,
    title,
    duration,
    releaseDate,
    description = '',
    statistics: { rate } = {},
    genre: { name } = {},
  } = {},
}) => {
  const { shortenString } = useStringFormatter();

  return (
    <Content>
      <Poster src={posterImage} />
      <MovieDetails>
        <h4>{releaseDate}</h4>
        <Title>{title}</Title>
        <h4>{name}</h4>
        <p>{shortenString(description, 200)}</p>
        <AdditionalInformations>
          <>
            <Clock size={'20px'} /> <strong>{duration} min</strong>
          </>
          <>
            <Star size={'20px'} /> <strong>{rate}/10</strong>
          </>
        </AdditionalInformations>
        <ShowMoreButton
          type='button'
          as={ReactLink}
          to={`/movie-details/${id}`}
        >
          Zobacz szczegóły
        </ShowMoreButton>
      </MovieDetails>
    </Content>
  );
};

export default MovieInformation;
