import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../api/api';

const CinemaContext = createContext({});

export const CinemaProvider = ({ children }) => {
  const [cinemaId, setCinemaId] = useState(undefined);

  const getCinemas = async () => {
    try {
      const response = await API.get('/cinemas');
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING CINEMAS', error);
      return null;
    }
  };

  const getAdminCinemas = async () => {
    try {
      const response = await API.get('/admin-cinemas');
      return response.data;
    } catch (error) {
      // console.log('ERROR FETCHING CINEMAS', error);
      return null;
    }
  };

  const postCinema = async (cityId, street) => {
    try {
      const response = await API.post('/cinema', { cityId, street });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const updateCinema = async (cinema) => {
    const { id } = cinema;
    try {
      const response = await API.put(`/cinema/${id}`, {
        cityId: cinema.cityId,
        street: cinema.street,
      });
      return response.data;
    } catch (error) {
      // console.log('ERR', error);
      return null;
    }
  };

  const removeCinema = async (id) => {
    try {
      const response = await API.delete(`/cinema/${id}`);
      return response.data.status;
    } catch (error) {
      // console.log('ERR', error);
      return false;
    }
  };

  return (
    <CinemaContext.Provider
      value={{
        cinemaId,
        setCinemaId,
        getCinemas,
        postCinema,
        getAdminCinemas,
        removeCinema,
        updateCinema,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export const useCinema = () => useContext(CinemaContext);

CinemaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
