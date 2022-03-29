/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTickets } from '../../../hooks/useTickets';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import {
  Container,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TRow,
  Wrapper,
  Header,
  Line,
  NoTicketsInfo,
} from './MyTickets.style';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TicketPreview from '../../molecules/TicketPreview/TicketPreview';
import { OutlineButton } from '../../atoms/Button/OutlineButton';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  const { getUserTickets } = useTickets();
  const [orderTickets, setOrderTickets] = useState({
    tickets: [],
    showPrint: false,
  });
  const printRef = useRef(null);

  const printDocument = (tickets) => {
    (async () => {
      await setOrderTickets({ tickets, showPrint: true });
      const input = printRef.current;
      await html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');
      });
      setOrderTickets({ tickets: [], showPrint: false });
    })();
  };
  useEffect(() => {
    (async () => {
      const obtainedTickets = await getUserTickets(user?.id);
      if (obtainedTickets) {
        if (obtainedTickets) {
          setTickets(obtainedTickets);
        }
      }
    })();
  }, [user]);

  const renderTickets = () => {
    const tickets = [];
    for (let i = 0; i < orderTickets.tickets.reservedSeats.length; i += 1) {
      tickets.push(
        <TicketPreview
          movie={orderTickets.tickets.movie}
          filmshow={orderTickets.tickets.filmshow}
          seatCords={orderTickets.tickets.reservedSeats[i]}
        />
      );
    }
    return tickets;
  };

  return (
    <Wrapper>
      <Container>
        {tickets.length > 0 ? (
          <>
            <Header>
              <h3>Wszystkie bilety</h3>
              <p>
                Na tej stronie dostępne są wszystkie bilety, które dotychczas
                zostały przez Ciebie kupione. Możesz pobrać bilety, by potem móc
                okazać je przy kasie.
              </p>
            </Header>
            <Line />
            <Table cellSpacing={0} cellPadding={10}>
              <THead>
                <TRow>
                  <TH>FILM</TH>
                  <TH>KINO</TH>
                  <TH isHiddenNext>SALA</TH>
                  <TH isHiddenNext>DATA ZAKUPU</TH>
                  <TH isHidden>CENA</TH>
                  <TH>OPCJE</TH>
                </TRow>
              </THead>
              <TBody>
                {tickets.map(
                  ({
                    id,
                    cityAddress,
                    cost,
                    playDate,
                    purchaseDate,
                    reservedSeats,
                    roomName,
                    movie: { id: movieId, title },
                    movie,
                  }) => (
                    <TRow key={id}>
                      <TD>
                        <ReactLink to={`/movie-details/${movieId}`}>
                          {title}
                        </ReactLink>
                      </TD>
                      <TD>{cityAddress}</TD>
                      <TD isHiddenNext>{roomName}</TD>
                      <TD isHiddenNext>{purchaseDate}</TD>
                      <TD isHidden>{cost} zł</TD>
                      <TD>
                        <button
                          type='button'
                          onClick={() =>
                            printDocument({
                              id,
                              movie,
                              filmshow: {
                                playDate,
                                room: { name: roomName },
                              },
                              reservedSeats,
                            })
                          }
                        >
                          Pobierz
                        </button>
                      </TD>
                    </TRow>
                  )
                )}
              </TBody>
            </Table>
          </>
        ) : (
          <NoTicketsInfo>
            <h3>Brak historii kupionych biletów.</h3>
            <ReactLink to={'/filmshows'}>
              <OutlineButton>Przejdź do seansów</OutlineButton>
            </ReactLink>
          </NoTicketsInfo>
        )}

        {orderTickets.showPrint && (
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
            {renderTickets()}
          </div>
        )}
      </Container>
    </Wrapper>
  );
};

export default MyTickets;
