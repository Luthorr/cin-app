/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import MoviesGrid from '../../molecules/MoviesGrid/MoviesGrid';
import { Wrapper, Content } from './MoviesPage.style';
import MoviesFilter from '../../molecules/MoviesFilter/MoviesFilter';
import { OrangeLine } from '../../atoms/Lines/Lines';
import { useMovie } from '../../../hooks/useMovie';
import { useAuth } from '../../../hooks/useAuth';
import { useSorter } from '../../../hooks/useSorter';
import Spinner from '../../atoms/Spinner/Spinner';
import { moviesPerPage } from '../../../constants';
import Pagination from '../../atoms/Pagination/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import MoviePosterv3 from '../../molecules/MoviePosterv3/MoviePosterv3';

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { paginate, currentPage } = usePagination();
  const {
    getAllMovies,
    getPlayedMovies,
    getFutureMovies,
    getUserFavouriteMovies,
    getUpdatedSearchArray,
  } = useMovie();
  const { sortData, sortNestedData } = useSorter();
  const { user } = useAuth();

  const initial = useRef(true);
  const componentMounted = useRef(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const moviesData = await getAllMovies();
      if (moviesData && componentMounted.current) {
        setAllMovies(moviesData);
        setMoviesToShow(moviesData);
      }
      componentMounted.current && setIsLoading(false);
    })();
    return () => {
      componentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (user && componentMounted.current) {
        const userFav = await getUserFavouriteMovies(user.id);
        setUserFavourites(userFav);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const searchDelay = setTimeout(() => {
      const updatedArray = getUpdatedSearchArray(searchTag, allMovies);
      setMoviesToShow(updatedArray);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(searchDelay);
    };
  }, [searchTag]);

  const handleSorting = (propName, asc) => {
    const sortedArray = sortData(moviesToShow, propName, asc);
    setMoviesToShow(sortedArray);
  };

  const handleNestedSorting = (propName, nestedPropName, asc) => {
    const sortedArray = sortNestedData(
      moviesToShow,
      propName,
      nestedPropName,
      asc
    );
    setMoviesToShow([...sortedArray]);
  };

  const handleAllMoviesShow = () => setMoviesToShow(allMovies);

  const showPlayedMovies = async () => {
    const movies = await getPlayedMovies();
    if (movies) {
      setMoviesToShow(movies);
    }
  };

  const showFutureMovies = async () => {
    const movies = await getFutureMovies();
    if (movies) {
      setMoviesToShow(movies);
    }
  };

  const renderMovies = () => {
    const moviePosters = [];
    for (
      let i = moviesPerPage * (currentPage - 1);
      i < moviesToShow.length && i < moviesPerPage * currentPage;
      i += 1
    ) {
      moviePosters.push(
        <MoviePosterv3
          key={moviesToShow[i].id}
          movie={moviesToShow[i]}
          userFavourites={userFavourites}
          setUserFavourites={setUserFavourites}
        />
      );
    }
    return moviePosters;
  };

  return (
    <Wrapper>
      <Content>
        <MoviesFilter
          setSearchTag={setSearchTag}
          handleSorting={handleSorting}
          handleNestedSorting={handleNestedSorting}
          handleAllMoviesShow={handleAllMoviesShow}
          showPlayedMovies={showPlayedMovies}
          showFutureMovies={showFutureMovies}
        />
        <OrangeLine />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {moviesToShow.length > 0 ? (
              <MoviesGrid>{renderMovies()}</MoviesGrid>
            ) : (
              <h3 style={{ alignSelf: 'center', padding: '2rem' }}>
                Brak filmów do wyświetlenia.
              </h3>
            )}

            {moviesToShow.length > 0 && (
              <Pagination
                postsPerPage={moviesPerPage}
                totalPosts={moviesToShow.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default MoviesPage;
