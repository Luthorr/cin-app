import React from 'react';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import {
  Wrapper,
  MovieImage,
  Figure,
  Figcaption,
  FigInfo,
  Year,
  Title,
  Rate,
  Genre,
  StarIcon,
} from './MoviePosterv2.style';
import { useMovie } from '../../../hooks/useMovie';
import { useAuth } from '../../../hooks/useAuth';

const MoviePoster = ({
  movie: {
    id,
    posterImage,
    releaseDate,
    title,
    statistics: { rate },
    genre: { name },
  },
  userFavourites,
  setUserFavourites,
}) => {
  const {
    isMovieInFavourite,
    removeMovieFromFavourites,
    addMovieToFavourites,
  } = useMovie();
  const { user } = useAuth();

  const isFav = isMovieInFavourite(id, userFavourites);

  const handleStarClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeMovieFromFavourites(user.id, id);
      setUserFavourites((prevState) =>
        prevState.filter((r) => r.movieId !== id)
      );
    } else {
      const postedFavourite = await addMovieToFavourites(user.id, id);
      if (postedFavourite) {
        setUserFavourites((prevState) => [...prevState, postedFavourite]);
      }
    }
  };

  return (
    <Wrapper>
      <ReactLink to={`/movie-details/${id}`}>
        <Figure>
          {user && (
            <>
              <StarIcon
                isfavourite={isFav ? 'true' : 'false'}
                onClick={handleStarClick}
              />
            </>
          )}
          <MovieImage src={posterImage} />
          <Figcaption posterImage={posterImage}>
            <FigInfo>
              <Year>{releaseDate}</Year>
              <Title>{title}</Title>
              <Rate>{rate > 0 ? rate : 'brak ocen'}</Rate>
              <Genre>{name}</Genre>
            </FigInfo>
          </Figcaption>
        </Figure>
      </ReactLink>
    </Wrapper>
  );
};

export default MoviePoster;
