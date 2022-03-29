import React, { useRef, useState } from 'react';
import { Content, Header } from './TicketSummary.style';
// import debitCard from '../../../images/fund.png';
// import { OutlineButton } from '../../atoms/Button/OutlineButton';
import TicketPreview from '../../molecules/TicketPreview/TicketPreview';
import ArrowPagination from '../../atoms/ArrowPagination/ArrowPagination';
import { OutlineButton } from '../../atoms/Button/OutlineButton';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TicketSummary = ({ movie, filmshow, reservedSeats }) => {
  const [ticketsPage, setTicketsPage] = useState(1);
  const printRef = useRef(null);
  const ticketsPerPage = 5;

  const paginate = (value) => {
    const maxPageNumber = Math.ceil(reservedSeats.length / ticketsPerPage);
    if (value < 0) {
      if (ticketsPage + value < 1) {
        setTicketsPage(maxPageNumber);
      } else {
        setTicketsPage((prevState) => prevState + value);
      }
    }
    if (value > 0) {
      if (ticketsPage + value > maxPageNumber) {
        setTicketsPage(1);
      } else {
        setTicketsPage((prevState) => prevState + value);
      }
    }
  };

  const renderTickets = () => {
    const tickets = [];
    for (
      let i = ticketsPerPage * (ticketsPage - 1);
      i < reservedSeats.length && i < ticketsPerPage * ticketsPage;
      i += 1
    ) {
      tickets.push(
        <TicketPreview
          key={JSON.stringify(reservedSeats[i])}
          movie={movie}
          filmshow={filmshow}
          seatCords={reservedSeats[i]}
        />
      );
    }
    return tickets;
  };

  const printDocument = () => {
    (async () => {
      const input = printRef.current;
      await html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');
      });
    })();
  };

  return (
    <Content>
      <Header>Gratulację, Twoje zamówienie przebiegło pomyślnie!</Header>
      <OutlineButton type='button' onClick={printDocument}>
        Pobierz
      </OutlineButton>
      {reservedSeats.length > ticketsPerPage && (
        <ArrowPagination paginate={paginate} currentPage={ticketsPage} />
      )}
      {renderTickets()}
      <ReactLink to='/filmshows'>
        <OutlineButton type='button'>Powrót</OutlineButton>
      </ReactLink>
      <div
        id='divToPrint'
        ref={printRef}
        style={{
          backgroundColor: '#f1f1f1',
          width: '210mm',
          minHeight: '297mm',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginTop: '500vh',
          position: 'fixed',
          top: '-2000px',
        }}
      >
        {reservedSeats.map((seat) => (
          <TicketPreview
            key={JSON.stringify(seat)}
            movie={movie}
            filmshow={filmshow}
            seatCords={seat}
          />
        ))}
      </div>
    </Content>
  );
};

export default TicketSummary;
