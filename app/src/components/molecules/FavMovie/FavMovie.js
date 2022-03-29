import React from 'react';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import {
  Wrapper,
  NarrowerColumn,
  WiderColumn,
  MoviePoster,
  MovieTitle,
  MovieDescription,
  ShortInfoRow,
  StarIcon,
  Row,
} from './FavMovie.style';
import { toast } from 'react-toastify';
// import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const FavMovie = ({
  movie: {
    id,
    title,
    posterImage,
    description,
    duration,
    // statistics: { rate, votes },
  },
  handleFavMovieDeletion,
}) => {
  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const answer = window.confirm('Czy chcesz usunąć film z ulubionych?');
    if (answer) {
      handleFavMovieDeletion(id);
      toast.success('Film został usunięty z ulubionych.');
    }
  };
  return (
    <ReactLink to={`/movie-details/${id}`}>
      <Wrapper>
        <NarrowerColumn>
          <MoviePoster src={posterImage} />
        </NarrowerColumn>
        <WiderColumn>
          <Row>
            <MovieTitle>{title}</MovieTitle>
            <StarIcon title='Usuń z ulubionych' onClick={handleStarClick} />
          </Row>
          <ShortInfoRow>
            <p>{duration} min</p>
          </ShortInfoRow>
          <MovieDescription>{description}</MovieDescription>
        </WiderColumn>
      </Wrapper>
    </ReactLink>
  );
};

export default FavMovie;
