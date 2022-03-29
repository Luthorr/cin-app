import API from '../api/api';
import { useFile } from './useFile';

export const useUser = () => {
  const { uploadFile } = useFile();

  const updateEmail = async (userId, email) => {
    try {
      const response = await API.put(`/user/${userId}`, {
        email,
      });
      return response.data;
    } catch (error) {
      // console.log('Error', error);
      return false;
    }
  };

  const updatePassword = async (userId, password, oldPassword) => {
    try {
      const response = await API.put(`/user/password/${userId}`, {
        oldPassword,
        password,
      });
      return response.data;
    } catch (error) {
      // console.log('Error', error);
      return false;
    }
  };

  const updateAvatar = async (userId, image) => {
    const avatar = await uploadFile(image);
    try {
      const response = await API.put(`/user/avatar/${userId}`, {
        avatar,
      });
      return response.data;
    } catch (error) {
      // console.log('Error', error);
      return false;
    }
  };

  return { updateEmail, updatePassword, updateAvatar };
};
