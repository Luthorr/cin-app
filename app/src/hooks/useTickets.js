import API from '../api/api';

export const useTickets = () => {
  const getUserTickets = async (userId) => {
    try {
      const response = await API.get(`/tickets/${userId}`);
      // console.log('RESPONSEDATA', response.data);
      return response.data;
    } catch (error) {
      // console.log('ERROR', error);
      return null;
    }
  };

  return { getUserTickets };
};
