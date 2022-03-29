import API from '../api/api';

export const useRoom = () => {
  const postRoom = async (room) => {
    const { cinemaId, name, rows, cols, unavailableSeats } = room;
    try {
      const response = await API.post('/room', {
        cinemaId,
        name,
        rows,
        cols,
        unavailableSeats: JSON.stringify(unavailableSeats),
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR ADDING ROOM', error);
    }
  };

  const getRoom = async (id) => {
    try {
      const response = await API.get(`/rooms/id/${id}`);
      return response.data[0];
    } catch (error) {
      // console.log('ERROR FETCHING ROOM', error);
      return null;
    }
  };

  const getAdminRooms = async () => {
    try {
      const response = await API.get(`/admin-rooms`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING ROOM', error);
      return null;
    }
  };

  const getRoomsByCinemaId = async (id) => {
    try {
      const response = await API.get(`/rooms/cinema/${id}`);
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING ROOMS', error);
      return null;
    }
  };

  const updateRoom = async (room) => {
    const { cinemaId, name, rows, cols, unavailableSeats, id } = room;

    try {
      const response = await API.put(`/room/${id}`, {
        cinemaId,
        name,
        rows,
        cols,
        unavailableSeats: JSON.stringify(unavailableSeats),
      });
      return response.data;
    } catch (error) {
      // console.log('err', error);
      return null;
    }
  };

  const removeRoom = async (id) => {
    try {
      const response = await API.delete(`/room/${id}`);
      return response.data.status;
    } catch (error) {
      // console.log('ERR', error);
      return false;
    }
  };

  return {
    postRoom,
    getRoom,
    getRoomsByCinemaId,
    getAdminRooms,
    updateRoom,
    removeRoom,
  };
};
