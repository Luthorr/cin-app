import React from 'react';
import {
  TicketContent,
  TicketRow,
  TicketValue,
  TicketLabel,
  QuitIcon,
} from './Ticket.style';
const Ticket = ({ seatCords, removeTicket, currentReservationStep }) => {
  const handleIconClick = () => {
    removeTicket(seatCords);
  };
  return (
    <TicketContent>
      <TicketRow>
        <TicketValue>{seatCords[0]}</TicketValue>
        <TicketLabel>rząd</TicketLabel>
      </TicketRow>
      <TicketRow>
        <TicketValue>{seatCords[1]}</TicketValue>
        <TicketLabel>miejsce</TicketLabel>
      </TicketRow>
      {currentReservationStep === 1 && <QuitIcon onClick={handleIconClick} />}
    </TicketContent>
  );
};

export default Ticket;
