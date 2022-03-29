import React from 'react';
import PropTypes from 'prop-types';
import RoomChair from '../../atoms/RoomChair/RoomChair';
import { RowWrapper } from './RoomRow.style';

const RoomRow = ({ currentRow, cols, unavailableSeats, dispatchRoom }) => {
  const renderRow = () => {
    const allChairs = [];
    for (let i = 0; i < cols; i += 1)
      allChairs.push(
        <RoomChair
          key={i}
          currentRow={currentRow}
          currentCol={i}
          unavailableSeats={unavailableSeats}
          dispatchRoom={dispatchRoom}
        />
      );
    return allChairs;
  };
  return <RowWrapper>{renderRow()}</RowWrapper>;
};
RoomRow.propTypes = {
  cols: PropTypes.number.isRequired,
  currentRow: PropTypes.number.isRequired,
  unavailableSeats: PropTypes.arrayOf(Array).isRequired,
  dispatchRoom: PropTypes.func.isRequired,
};
export default RoomRow;
