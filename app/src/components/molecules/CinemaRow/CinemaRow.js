import React from 'react';
import Chair from '../../atoms/Chair/Chair';
import { Wrapper } from './CinemaRow.style';

const CinemaRow = ({
  cols,
  currentRow,
  unavailableSeats,
  occupiedSeats,
  reservedSeats,
  setReservedSeats,
}) => {
  const renderRow = () => {
    const allChairs = [];
    for (let i = 0; i < cols; i += 1)
      allChairs.push(
        <Chair
          key={i}
          currentRow={currentRow}
          cols={cols}
          currentCol={i}
          unavailableSeats={unavailableSeats}
          occupiedSeats={occupiedSeats}
          reservedSeats={reservedSeats}
          setReservedSeats={setReservedSeats}
        />
      );
    return allChairs;
  };

  return <Wrapper>{renderRow()}</Wrapper>;
};

export default CinemaRow;
