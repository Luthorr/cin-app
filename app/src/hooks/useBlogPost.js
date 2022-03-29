import { useFile } from './useFile';
import API from '../api/api';
import { useDateFormatter } from './useDateFormatter';

export const useBlogPost = () => {
  const { uploadFile } = useFile();
  const { getCurrentDate } = useDateFormatter();

  const getBlogPostById = async (id) => {
    try {
      const response = await API.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING BLOGPOST', error);
      return null;
    }
  };

  const getBlogPosts = async () => {
    try {
      const response = await API.get('/news');
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING BLOGPOST', error);
      return null;
    }
  };

  const getAdminBlogPosts = async () => {
    try {
      const response = await API.get('/admin-news');
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING BLOGPOST', error);
      return null;
    }
  };

  const postBlogPost = async (news) => {
    const image = await uploadFile(news.image);
    const creationDate = getCurrentDate();
    try {
      const response = await API.post('/news', {
        ...news,
        image,
        creationDate,
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR', error);
    }
  };

  const updateBlogpost = async (news) => {
    let { image } = news;
    const { id, ...blogP } = news;
    if (image instanceof File) {
      image = await uploadFile(image);
    }
    try {
      const response = await API.put(`/news/${id}`, {
        ...blogP,
        image,
      });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
    }
  };

  const removeBlogpost = async (id) => {
    try {
      const response = await API.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
    }
  };

  return {
    getBlogPostById,
    postBlogPost,
    getBlogPosts,
    getAdminBlogPosts,
    updateBlogpost,
    removeBlogpost,
  };
};
