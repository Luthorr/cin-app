import API from '../api/api';

export const useFilmshow = () => {
  const getFilmshowsByDate = async (cinemaId, date) => {
    try {
      const response = await API.get(`/filmshows/${cinemaId}/${date}`);
      return response.data;
    } catch (error) {
      // console.log(`ERROR FETCHING FILMSHOWS ${cinemaId} - ${date}`, error);
      return null;
    }
  };

  const getFilmshowById = async (filmshowId) => {
    try {
      const response = await API.get(`/filmshow/${filmshowId}`);
      return response.data;
    } catch (error) {
      // console.log(`ERROR FETCHING FILMSHOW ${filmshowId}`, error);
      return null;
    }
  };

  const getMovieFilmshows = async (movieId, cinemaId) => {
    try {
      const response = await API.get(`/movieFilmshows/${movieId}/${cinemaId}`);
      return response.data;
    } catch (error) {
      // console.log('error', error);
      return null;
    }
  };

  const getAdminFilmshows = async () => {
    try {
      const response = await API.get('/admin-filmshows');
      return response.data;
    } catch (error) {
      // console.log('error', error);
      return null;
    }
  };

  const mergeDate = (date, time) => `${date} ${time}`;

  const postFilmshow = async (filmshow) => {
    try {
      const { cinemaId, roomId, movieId, date, time } = filmshow;
      const playDate = mergeDate(date, time);
      const response = await API.post('/filmshow', {
        cinemaId,
        roomId,
        movieId,
        playDate,
        occupiedSeats: JSON.stringify([]),
      });
      return response.data;
    } catch (error) {
      // console.log('error', error);
      return null;
    }
  };

  const removeFilmshow = async (id) => {
    try {
      const response = await API.delete(`/filmshow/${id}`);
      return response.data.status;
    } catch (error) {
      // console.log('ERR', error);
      return false;
    }
  };

  const updateFilmshow = async (filmshow) => {
    const { roomId, movieId, date, time } = filmshow;
    const playDate = mergeDate(date, time);
    try {
      const response = await API.put(`/filmshow/${filmshow.id}`, {
        roomId,
        movieId,
        playDate,
      });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const getUpdatedSearchArray = (searchTag, filmshows) => {
    let updatedObject = {};
    Object.keys(filmshows).forEach((key) => {
      const titleToLower = filmshows[key].title.toLowerCase();
      if (titleToLower.includes(searchTag.toLowerCase())) {
        updatedObject = { ...updatedObject, [key]: filmshows[key] };
      }
    });
    return updatedObject;
  };

  return {
    postFilmshow,
    getFilmshowsByDate,
    getFilmshowById,
    getMovieFilmshows,
    getUpdatedSearchArray,
    getAdminFilmshows,
    removeFilmshow,
    updateFilmshow,
  };
};
