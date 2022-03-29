import API from '../api/api';
import { useDateFormatter } from './useDateFormatter';

export const usePost = () => {
  const { getCurrentDate } = useDateFormatter();

  const getPostsByReviewId = async (reviewId) => {
    try {
      const response = await API.get(`/posts/${reviewId}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING POSTS BY REVIEW ID', error);
      return null;
    }
  };

  const postForumPost = async (userId, reviewId, content) => {
    const creationDate = getCurrentDate();
    try {
      const response = await API.post('/post', {
        userId,
        reviewId,
        content,
        creationDate,
      });
      return response.data;
    } catch (error) {
      // console.log('Error posting user post', error);
      return null;
    }
  };

  const updatePost = async (id, content) => {
    try {
      const response = await API.put(`/post/${id}`, { content });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await API.delete(`/post/${postId}`);
      return response.data.status;
    } catch (error) {
      // console.log('ERROR', error);
      return null;
    }
  };

  return { getPostsByReviewId, postForumPost, deletePost, updatePost };
};
