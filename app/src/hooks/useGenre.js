import API from '../api/api';

export const useGenre = () => {
  const getGenres = async () => {
    try {
      const response = await API.get('/genres');
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING GENRES', error);
      return null;
    }
  };
  return { getGenres };
};
