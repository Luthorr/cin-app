/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  Title,
  PosterImg,
  Container,
  NarrowerColumn,
  WiderColumn,
  ReservationDetails,
  FilmshowDetails,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  Tickets,
  TotalPrice,
  TotalPriceLabel,
  TotalPriceValue,
  HiddenPoster,
  HeroWrapper,
  Detail,
  DetailLabel,
  DetailValue,
  ReservationProcess,
  ReservationProgress,
  ReservationStep,
  ReservationStepNumber,
  SpinnerContainer,
} from './Reservation.style';

// import Chair from '../../atoms/Chair/Chair';
import HeroImage from '../../organism/HeroImage/HeroImage';
import Ticket from '../../atoms/Ticket/Ticket';
import { useParams, useHistory } from 'react-router-dom';
import { useFilmshow } from '../../../hooks/useFilmshow';
import { useReservation } from '../../../hooks/useReservation';
import { useAuth } from '../../../hooks/useAuth';
import { POINTS_FOR_TICKET, ticketsPerPage } from '../../../constants';
import ChairsPicker from '../../organism/ChairsPicker/ChairsPicker';
import Spinner from '../../atoms/Spinner/Spinner';
import TicketPayment from '../../organism/TicketPayment/TicketPayment';
import TicketSummary from '../../organism/TicketSummary/TicketSummary';
import ArrowPagination from '../../atoms/ArrowPagination/ArrowPagination';

const Reservation = () => {
  const { id } = useParams();
  const [filmshow, setFilmshow] = useState(null);
  const [movie, setMovie] = useState(null);
  const [cost, setCost] = useState(0);
  const [room, setRoom] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [ticketsPage, setTicketsPage] = useState(1);
  const { getFilmshowById } = useFilmshow();
  const { getFinalCost, buyTicket } = useReservation();
  const { user, setUser } = useAuth();
  const [currentReservationStep, setCurrentReservationStep] = useState(1);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    (async () => {
      const obtainedFilmshow = await getFilmshowById(id);
      if (obtainedFilmshow) {
        setFilmshow(obtainedFilmshow);
        setRoom(obtainedFilmshow?.room);
        setMovie(obtainedFilmshow?.movie);
      } else {
        history.push('/not-found');
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const finalCost = getFinalCost(reservedSeats);
    setCost(finalCost);
    const maxPageNumber = Math.ceil(reservedSeats.length / ticketsPerPage);
    setTicketsPage(maxPageNumber < 1 ? 1 : maxPageNumber);
  }, [reservedSeats]);

  const removeTicket = (seatsCord) => {
    for (let i = 0; i < reservedSeats.length; i += 1) {
      if (JSON.stringify(reservedSeats[i]) === JSON.stringify(seatsCord)) {
        setReservedSeats(reservedSeats.filter((item, index) => index !== i));
        break;
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
        <Ticket
          key={JSON.stringify(reservedSeats[i])}
          seatCords={reservedSeats[i]}
          removeTicket={removeTicket}
          currentReservationStep={currentReservationStep}
        />
      );
    }
    return tickets;
  };

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

  const handleReservedSeatsClear = () => {
    setReservedSeats([]);
  };

  const handleGoingFurther = () => {
    setCurrentReservationStep((prevState) => prevState + 1);
  };

  const handleGoingBack = () => {
    setCost(getFinalCost(reservedSeats));
    setCurrentReservationStep((prevState) => prevState - 1);
  };

  const handleTicketBuy = async (e, ticketsPaidWithPoints) => {
    e.preventDefault();
    const response = await buyTicket(
      filmshow.id,
      user.id,
      reservedSeats,
      cost,
      ticketsPaidWithPoints
    );
    if (response) {
      setCurrentReservationStep(3);
      setUser((prevState) => ({
        ...prevState,
        points: prevState.points - ticketsPaidWithPoints * POINTS_FOR_TICKET,
      }));
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <HeroWrapper>
            <HeroImage image={movie?.bgImage} height={500}>
              <Title>{movie?.title}</Title>
            </HeroImage>
          </HeroWrapper>
          <HiddenPoster src={movie?.posterImage} />
          <Container>
            <NarrowerColumn>
              <PosterImg src={movie?.posterImage} />
              <FilmshowDetails>
                <Detail>
                  <DetailLabel>Data</DetailLabel>
                  <DetailValue>{filmshow?.playDate.split(' ')[0]}</DetailValue>
                </Detail>
                <Detail>
                  <DetailLabel>Godzina</DetailLabel>
                  <DetailValue>{filmshow?.playDate.split(' ')[1]}</DetailValue>
                </Detail>
                <Detail>
                  <DetailLabel>Sala</DetailLabel>
                  <DetailValue>{filmshow?.room?.name}</DetailValue>
                </Detail>
              </FilmshowDetails>
              <Tickets>
                {reservedSeats.length > ticketsPerPage && (
                  <ArrowPagination
                    paginate={paginate}
                    currentPage={ticketsPage}
                  />
                )}
                {renderTickets()}
              </Tickets>
              {currentReservationStep === 1 && (
                <>
                  <TotalPrice>
                    <TotalPriceLabel>Do zapłaty:</TotalPriceLabel>
                    <TotalPriceValue>{cost} zł</TotalPriceValue>
                  </TotalPrice>
                  <ButtonContainer>
                    <CancelButton
                      type='button'
                      onClick={handleReservedSeatsClear}
                    >
                      ANULUJ
                    </CancelButton>
                    <ConfirmButton
                      type='button'
                      disabled={reservedSeats.length <= 0}
                      onClick={handleGoingFurther}
                    >
                      DALEJ
                    </ConfirmButton>
                  </ButtonContainer>
                </>
              )}
            </NarrowerColumn>
            <WiderColumn>
              <ReservationDetails>
                <ReservationProcess>
                  <ReservationProgress isActive={currentReservationStep === 1}>
                    <ReservationStep>1</ReservationStep> <p>Wybór miejsca</p>
                  </ReservationProgress>
                  <ReservationProgress isActive={currentReservationStep === 2}>
                    <ReservationStep>2</ReservationStep> <p>Płatność</p>
                  </ReservationProgress>
                  <ReservationProgress isActive={currentReservationStep === 3}>
                    <ReservationStep>
                      <ReservationStepNumber>3</ReservationStepNumber>
                    </ReservationStep>
                    <p>Podsumowanie</p>
                  </ReservationProgress>
                </ReservationProcess>

                {currentReservationStep === 1 && (
                  <ChairsPicker
                    room={room}
                    filmshow={filmshow}
                    reservedSeats={reservedSeats}
                    setReservedSeats={setReservedSeats}
                  />
                )}
                {currentReservationStep === 2 && (
                  <TicketPayment
                    reservedSeats={reservedSeats}
                    handleGoingBack={handleGoingBack}
                    handleTicketBuy={handleTicketBuy}
                    cost={cost}
                    setCost={setCost}
                  />
                )}
                {currentReservationStep === 3 && (
                  <TicketSummary
                    movie={movie}
                    filmshow={filmshow}
                    reservedSeats={reservedSeats}
                  />
                )}
              </ReservationDetails>
            </WiderColumn>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default Reservation;
