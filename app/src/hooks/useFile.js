import API from '../api/api';
import { allowedFileTypes } from '../constants';

export const useFile = () => {
  const uploadFile = async (fileToSent) => {
    const formData = new FormData();
    formData.append('file', fileToSent);
    try {
      const res = await API.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const filePath = res.data?.filePath;
      return filePath;
    } catch (error) {
      return null;
    }
  };

  const isFileImage = ({ type }) => {
    const fileType = type.split('/')[1];
    if (allowedFileTypes.includes(fileType)) {
      return true;
    }
    return false;
  };

  return { uploadFile, isFileImage };
};
