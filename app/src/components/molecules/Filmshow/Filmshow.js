import React from 'react';
import {
  Wrapper,
  NarrowerColumn,
  WiderColumn,
  MoviePoster,
  MovieTitle,
  MovieDescription,
  ShortInfoRow,
  MovieGenre,
  RatingsRow,
  RatingText,
  RatingsCountText,
  AvailableFilmshows,
  FilmshowButton,
} from './Filmshow.style';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import { IoMdStar } from 'react-icons/io';

const Filmshow = ({
  movie: {
    id,
    title,
    posterImage,
    description,
    duration,
    playDates,
    genre,
    statistics: { rate, votes },
  },
}) => {
  return (
    <Wrapper>
      <NarrowerColumn>
        <MoviePoster src={posterImage} />
      </NarrowerColumn>
      <WiderColumn>
        <ReactLink to={`/movie-details/${id}`}>
          <MovieTitle>{title}</MovieTitle>
        </ReactLink>

        <ShortInfoRow>
          <p>{duration} min</p>
          <MovieGenre>{genre}</MovieGenre>
        </ShortInfoRow>
        <RatingsRow>
          <RatingText>
            <IoMdStar size='20px' /> {rate}/10
          </RatingText>
          <RatingsCountText>liczba głosów: {votes}</RatingsCountText>
        </RatingsRow>
        <MovieDescription>{description}</MovieDescription>
        <AvailableFilmshows>
          {playDates.map(({ id: filmshowId, date }) => (
            <ReactLink key={filmshowId} to={`/reservation/${filmshowId}`}>
              <FilmshowButton
                type='button'
                className='btn btn-own-secondary m-1 p-2'
              >
                <strong>{date.split(' ')[1]}</strong>
              </FilmshowButton>
            </ReactLink>
          ))}
        </AvailableFilmshows>
      </WiderColumn>
    </Wrapper>
  );
};

export default Filmshow;
