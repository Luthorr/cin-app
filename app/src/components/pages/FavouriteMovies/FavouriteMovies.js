/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useMovie } from '../../../hooks/useMovie';
import { useAuth } from '../../../hooks/useAuth';
import { usePagination } from '../../../hooks/usePagination';
import { Wrapper, Container } from './FavouriteMovies.style';
import FavMovie from '../../molecules/FavMovie/FavMovie';
import moviesBG from '../../../images/popcorn.jpg';
import { favMoviesPerPage } from '../../../constants';
import Pagination from '../../atoms/Pagination/Pagination';
import { OutlineButton } from '../../atoms/Button/OutlineButton';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const FavouriteMovies = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const { getDetailedUserFavouriteMovies, removeMovieFromFavourites } =
    useMovie();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { currentPage, paginate } = usePagination();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const obtainedData = await getDetailedUserFavouriteMovies(user?.id);
      if (obtainedData) {
        setFavouriteMovies(obtainedData);
      }
      setIsLoading(false);
    })();
  }, [user]);

  const handleFavMovieDeletion = async (id) => {
    removeMovieFromFavourites(user.id, id);
    setFavouriteMovies((prevState) => prevState.filter((r) => r.id !== id));
  };

  const renderFilmshows = () => {
    const filmshowsArray = [];
    for (
      let i = favMoviesPerPage * (currentPage - 1);
      i < Object.keys(favouriteMovies).length &&
      i < favMoviesPerPage * currentPage;
      i += 1
    ) {
      filmshowsArray.push(
        <FavMovie
          key={favouriteMovies[i].id}
          movie={favouriteMovies[i]}
          handleFavMovieDeletion={handleFavMovieDeletion}
        />
      );
    }
    return filmshowsArray;
  };

  return (
    <Wrapper moviesBG={moviesBG}>
      {!isLoading && (
        <Container>
          {renderFilmshows()}
          {favouriteMovies.length <= 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '3rem',
              }}
            >
              <h2 style={{ textAlign: 'center' }}>
                Twoje ulubione filmy są puste.
                <br /> Dodaj film, by móc go tutaj zobaczyć
              </h2>
              <ReactLink to={'/movies'}>
                <OutlineButton>Przejdź do filmów</OutlineButton>
              </ReactLink>
            </div>
          )}
          {/* {favouriteMovies.map((movie) => (
            <FavMovie
              key={movie.id}
              movie={movie}
              handleFavMovieDeletion={handleFavMovieDeletion}
            />
          ))} */}
          {favouriteMovies.length > 0 && (
            <Pagination
              paginate={paginate}
              currentPage={currentPage}
              postsPerPage={favMoviesPerPage}
              totalPosts={favouriteMovies.length}
            />
          )}
        </Container>
      )}
    </Wrapper>
  );
};

export default FavouriteMovies;
