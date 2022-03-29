import API from '../api/api';
import { useFile } from './useFile';

export const useMovie = () => {
  const { uploadFile } = useFile();

  const getAllMovies = async () => {
    try {
      const response = await API.get('/movies');
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING MOVIES', error);
      return null;
    }
  };

  const getPlayedMovies = async () => {
    try {
      const response = await API.get('/played-movies');
      // console.log('RESPONSE', response);
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const getFutureMovies = async () => {
    try {
      const response = await API.get('/future-movies');
      // console.log('RESPONSE', response);
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const getMovieById = async (movieId) => {
    try {
      const response = await API.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING MOVIE', error);
      return null;
    }
  };

  const getMoviesByTitle = async (title) => {
    try {
      const response = await API.get(`/movies/${title}`);
      return response.data;
    } catch (error) {
      // console.log('error', error);
      return null;
    }
  };

  const getAdminMovies = async () => {
    try {
      const response = await API.get('/admin-movies');
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const postMovie = async (movie) => {
    const posterImage = await uploadFile(movie.posterImage);
    const bgImage = await uploadFile(movie.bgImage);
    try {
      const response = await API.post('/movie', {
        ...movie,
        posterImage,
        bgImage,
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR', error);
    }
  };

  const updateMovie = async (movie) => {
    let { posterImage, bgImage } = movie;
    if (posterImage instanceof File) {
      posterImage = await uploadFile(posterImage);
    }
    if (bgImage instanceof File) {
      bgImage = await uploadFile(bgImage);
    }

    try {
      const response = await API.put(`/movie/${movie.id}`, {
        ...movie,
        posterImage,
        bgImage,
      });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const removeMovie = async (id) => {
    try {
      const response = await API.delete(`/movie/${id}`);
      return response.data.status;
    } catch (error) {
      // console.log('ERR', error);
    }
  };

  const getUserFavouriteMovies = async (userId) => {
    try {
      const response = await API.get(`/userFavourite/${userId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHIN FAV MOVIES', error);
      return null;
    }
  };

  const getDetailedUserFavouriteMovies = async (userId) => {
    try {
      const response = await API.get(`/userFavourite/detailed/${userId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHIN FAV MOVIES', error);
      return null;
    }
  };

  const isMovieInFavourite = (movieId, userFavourites) => {
    if (userFavourites !== null) {
      for (let i = 0; i < userFavourites.length; i += 1) {
        if (userFavourites[i].movieId === movieId) {
          return true;
        }
      }
    }
    return false;
  };

  const removeMovieFromFavourites = async (userId, movieId) => {
    try {
      const response = await API.delete(`/userFavourite/${userId}/${movieId}`);
      return response.status;
    } catch (error) {
      // console.log('ERROR REMOVING FROM FAV.', error);
      return error;
    }
  };

  const addMovieToFavourites = async (userId, movieId) => {
    try {
      const response = await API.post('/userFavourite', {
        userId,
        movieId,
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR POSTING MOVIE TO FAV.', error);
      return null;
    }
  };

  const rateMovie = async (userId, movieId, rate) => {
    try {
      await API.post('/userRatings', {
        movieId,
        userId,
        rate,
      });
    } catch (error) {
      // console.log('ERROR RATING MOVIE', error);
    }
  };

  const changeMovieRating = async (userId, movieId, rate) => {
    try {
      await API.put(`/userRatings/${userId}/${movieId}`, {
        rate,
      });
    } catch (error) {
      // console.log('ERROR RATING MOVIE', error);
    }
  };

  const getUserMovieRate = async (userId, movieId) => {
    try {
      const response = await API.get(`/userRatings/${userId}/${movieId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR', error);
      return null;
    }
  };

  const getUpdatedSearchArray = (searchTag, movies) => {
    const updatedArray = movies.filter(({ title }) => {
      const titleToLower = title.toLowerCase();
      return titleToLower.includes(searchTag.toLowerCase());
    });
    return updatedArray;
  };

  return {
    postMovie,
    getAllMovies,
    getPlayedMovies,
    getFutureMovies,
    getMovieById,
    getUserFavouriteMovies,
    getDetailedUserFavouriteMovies,
    isMovieInFavourite,
    removeMovieFromFavourites,
    addMovieToFavourites,
    rateMovie,
    getUserMovieRate,
    changeMovieRating,
    getMoviesByTitle,
    getUpdatedSearchArray,
    removeMovie,
    getAdminMovies,
    updateMovie,
  };
};
