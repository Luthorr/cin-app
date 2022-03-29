/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useReservation } from '../../../hooks/useReservation';
import { Wrapper, UpperChair, LowerChair } from './Chair.style';

/**
 * Krzesło w rezerwacjach
 */
const Chair = ({
  currentRow,
  currentCol,
  unavailableSeats,
  occupiedSeats,
  reservedSeats,
  setReservedSeats,
}) => {
  const [preBooked, setPreBooked] = useState(false);
  const [reserved, setReserved] = useState(false);
  const { isValid } = useReservation();

  const checkChairState = () => {
    if (reserved) {
      return 'selected';
    }
    if (preBooked) {
      return 'reserved';
    }
  };

  useEffect(() => {
    const isBlocked = isValid(currentRow, currentCol, occupiedSeats);
    setPreBooked(isBlocked);
  }, []);

  useEffect(() => {
    for (let i = 0; i < reservedSeats.length; i += 1) {
      if (
        JSON.stringify(reservedSeats[i]) ===
        JSON.stringify([currentRow, currentCol])
      ) {
        setReserved(true);
        return;
      }
    }
    setReserved(false);
  }, [reservedSeats]);

  return (
    <Wrapper
      isPickable={isValid(currentRow, currentCol, unavailableSeats)}
      chairState={checkChairState()}
      onClick={() => {
        if (!preBooked) {
          // setReserved(!reserved);
          if (reserved) {
            const filteredArray = reservedSeats.filter((arr) => {
              if (arr[0] !== currentRow || arr[1] !== currentCol) {
                return arr;
              }
              return null;
            });
            setReservedSeats([...filteredArray]);
          } else {
            setReservedSeats((prevState) => [
              ...prevState,
              [currentRow, currentCol],
            ]);
          }
        }
      }}
    >
      <UpperChair />
      <LowerChair />
    </Wrapper>
  );
};

export default Chair;
