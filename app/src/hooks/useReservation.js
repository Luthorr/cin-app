import API from '../api/api';
import { useDateFormatter } from './useDateFormatter';
import { TICKET_PRICE } from '../constants';
export const useReservation = () => {
  const { getCurrentDate } = useDateFormatter();

  const isValid = (currentRow, currentCol, seatsArray) => {
    const currentSeatCords = [currentRow, currentCol];
    for (let i = 0; i < seatsArray.length; i += 1) {
      if (JSON.stringify(seatsArray[i]) === JSON.stringify(currentSeatCords)) {
        return true;
      }
    }
    return false;
  };

  const getFinalCost = (reservedSeats) => TICKET_PRICE * reservedSeats.length;

  const buyTicket = async (
    filmshowId,
    userId,
    reservedSeats,
    cost,
    ticketsPaidWithPoints
  ) => {
    const purchaseDate = getCurrentDate();
    try {
      const response = await API.post('/ticket/buy', {
        filmshowId,
        userId,
        reservedSeats: JSON.stringify(reservedSeats),
        purchaseDate,
        cost,
        ticketsPaidWithPoints,
      });
      return response.data;
    } catch (error) {
      // console.log('ERROR POSTING TICKET', error);
      return null;
    }
  };

  return { isValid, getFinalCost, buyTicket };
};
