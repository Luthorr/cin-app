import API from '../api/api';
import { useDateFormatter } from './useDateFormatter';

export const useReview = () => {
  const { getCurrentDate } = useDateFormatter();

  const getReviewsByMovieId = async (movieId) => {
    try {
      const response = await API.get(`/reviews/${movieId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING MOVIE REVIEWS', error);
      return null;
    }
  };

  const postReview = async (movieId, userId, title, content) => {
    const creationDate = getCurrentDate();
    try {
      const response = await API.post('/review', {
        movieId,
        userId,
        title,
        content,
        creationDate,
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR POSTING REVIEW', error);
      return null;
    }
  };

  const getReviewById = async (reviewId) => {
    try {
      const response = await API.get(`/review/${reviewId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING REVIEW BY ID', error);
      return null;
    }
  };

  const updateReviewPoints = async (reviewId, newRate, userId) => {
    try {
      const response = await API.put(`/review/points/${reviewId}`, {
        newRate,
        userId,
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR', error);
      return false;
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await API.delete(`/review/${reviewId}`);
      return response.data.status;
    } catch (error) {
      // console.log('ERROR', error);
      return null;
    }
  };

  const updateReview = async (reviewId, title, content) => {
    try {
      const response = await API.put(`/review/${reviewId}`, { title, content });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  return {
    getReviewsByMovieId,
    getReviewById,
    postReview,
    updateReviewPoints,
    deleteReview,
    updateReview,
  };
};
