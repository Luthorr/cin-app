import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './CinemaRoom.style';
import CinemaRow from '../../molecules/CinemaRow/CinemaRow';

const CinemaRoom = ({
  rows,
  cols,
  unavailableSeats,
  occupiedSeats,
  reservedSeats,
  setReservedSeats,
}) => {
  const renderRows = () => {
    const array = [];
    for (let i = 0; i <= rows - 1; i += 1) {
      array.push(
        <CinemaRow
          key={i}
          currentRow={i}
          cols={cols}
          unavailableSeats={unavailableSeats}
          occupiedSeats={occupiedSeats}
          reservedSeats={reservedSeats}
          setReservedSeats={setReservedSeats}
        />
      );
    }
    return array;
  };

  return <Wrapper>{renderRows()}</Wrapper>;
};

CinemaRoom.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  unavailableSeats: PropTypes.arrayOf(Array).isRequired,
  occupiedSeats: PropTypes.arrayOf(Array).isRequired,
  reservedSeats: PropTypes.arrayOf(Array).isRequired,
  setReservedSeats: PropTypes.func.isRequired,
};
export default CinemaRoom;
