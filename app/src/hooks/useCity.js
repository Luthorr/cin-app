import API from '../api/api';
export const useCity = () => {
  const getCities = async () => {
    try {
      const response = await API.get('/cities');
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const postCity = async (name) => {
    try {
      const response = await API.post('/city', { name });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const updateCity = async (city) => {
    const { id, name } = city;
    try {
      const response = await API.put(`/city/${id}`, { name });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const removeCity = async (id) => {
    try {
      const response = await API.delete(`/city/${id}`);
      return response.data.status;
    } catch (error) {
      return false;
    }
  };

  return { getCities, postCity, updateCity, removeCity };
};
