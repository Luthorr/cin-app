import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { OrangeLine } from '../../atoms/Lines/Lines';
import {
  BackButton,
  ConfirmButton,
  Content,
  Header,
  Input,
  Points,
  Group,
  Label,
  Info,
  ButtonContainer,
  PriceContainer,
  TotalPrice,
  Price,
  ShortNote,
} from './TicketPayment.style';
import { TICKET_PRICE } from '../../../constants';

const TicketPayment = ({
  reservedSeats,
  handleGoingBack,
  handleTicketBuy,
  cost,
  setCost,
}) => {
  const { user } = useAuth();
  const [ticketsPaidWithPoints, setTicketsPaidWithPoints] = useState(0);

  const preventWriting = (e) => {
    e.preventDefault();
  };

  const handleTicketChange = (e) => {
    const { value } = e.target;
    const currentTicketsPayed = ticketsPaidWithPoints;
    if (value <= reservedSeats.length) {
      setTicketsPaidWithPoints(e.target.value);
      if (value <= currentTicketsPayed) {
        setCost((prevState) => prevState + TICKET_PRICE);
      } else {
        setCost((prevState) => prevState - TICKET_PRICE);
      }
    }
  };

  const handlePurchase = (e) => {
    handleTicketBuy(e, ticketsPaidWithPoints);
  };

  const maxTicketsToBuy = Math.floor(user?.points / 10);

  return (
    <Content>
      <Header>Informacje</Header>
      <OrangeLine />
      <Info>
        Na swoim koncie posiadasz <Points>{user.points}</Points> punktów
        recenzji. <br />
        Każde zdobyte 10 punktów możesz wykorzystać jako środek, do opłacenia
        jednego biletu.
      </Info>
      <Group>
        <Label>
          Liczba biletów do wykorzystania{' '}
          <ShortNote>(maksymalnie {maxTicketsToBuy} bilety)</ShortNote>
        </Label>
        <Input
          type='number'
          value={ticketsPaidWithPoints}
          min={0}
          max={maxTicketsToBuy}
          onKeyDown={preventWriting}
          onChange={handleTicketChange}
        />
      </Group>
      <PriceContainer>
        <TotalPrice>
          Łączna kwota do zapłaty: <Price>{cost}</Price> złotych
        </TotalPrice>
      </PriceContainer>
      <ButtonContainer>
        <BackButton type='button' onClick={handleGoingBack}>
          Cofnij
        </BackButton>
        <ConfirmButton type='button' onClick={handlePurchase}>
          Do płatności
        </ConfirmButton>
      </ButtonContainer>
    </Content>
  );
};

export default TicketPayment;
