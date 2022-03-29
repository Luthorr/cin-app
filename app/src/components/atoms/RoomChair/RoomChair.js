/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useReservation } from '../../../hooks/useReservation';
import { Wrapper, UpperChair, LowerChair } from './RoomChair.style';

/**
 *  Krzesło używane w formularzu dodawanie nowej sali
 */
const RoomChair = ({
  currentRow,
  currentCol,
  unavailableSeats,
  dispatchRoom,
}) => {
  const [disabled, setDisabled] = useState(false);
  const { isValid } = useReservation();

  useEffect(() => {
    const isBlocked = isValid(currentRow, currentCol, unavailableSeats);
    setDisabled(isBlocked);
  }, []);

  return (
    <Wrapper
      disabled={disabled}
      onClick={() => {
        setDisabled(!disabled);
        if (disabled) {
          const filteredSeats = unavailableSeats.filter((arr) => {
            if (arr[0] !== currentRow || arr[1] !== currentCol) {
              return arr;
            }
            return null;
          });
          dispatchRoom({
            type: 'handleChange',
            payload: { name: 'unavailableSeats', value: filteredSeats },
          });
        } else {
          dispatchRoom({
            type: 'handleChange',
            payload: {
              name: 'unavailableSeats',
              value: [...unavailableSeats, [currentRow, currentCol]],
            },
          });
        }
      }}
    >
      <UpperChair />
      <LowerChair />
    </Wrapper>
  );
};

export default RoomChair;
