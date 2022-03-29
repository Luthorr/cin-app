import React from 'react';
import {
  Wrapper,
  Card,
  Info,
  Image,
  Title,
  StarIcon,
} from './MoviePoster.style';
import { useMovie } from '../../../hooks/useMovie';
import { useAuth } from '../../../hooks/useAuth';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import { toast } from 'react-toastify';

const MoviePosterv3 = ({
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
      toast.success('Film został usunięty z ulubionych.');
    } else {
      const postedFavourite = await addMovieToFavourites(user.id, id);
      if (postedFavourite) {
        setUserFavourites((prevState) => [...prevState, postedFavourite]);
        toast.success('Film został dodany do ulubionych.');
      }
    }
  };

  return (
    <Wrapper>
      <ReactLink to={`/movie-details/${id}`}>
        <Card>
          <Image src={posterImage} alt='movie poster' />
          <Info>
            {user && (
              <>
                <StarIcon
                  isfavourite={isFav ? 'true' : 'false'}
                  onClick={handleStarClick}
                  title={isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                />
              </>
            )}
            <h3>{title}</h3>
            <p>{name}</p>
            <p>{rate > 0 ? `${rate}/10` : 'nieoceniony'}</p>
            <p>{releaseDate}</p>
          </Info>
        </Card>
        <Title>{title}</Title>
      </ReactLink>
    </Wrapper>
  );
};

export default MoviePosterv3;
