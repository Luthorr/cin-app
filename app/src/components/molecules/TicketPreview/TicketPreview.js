import React from 'react';
import {
  Content,
  SeatCords,
  Info,
  SeatsContainer,
  SeatNumber,
  SeatHeader,
  FilmshowDetails,
  Logo,
  WiderColumn,
  NarrowerColumn,
  BarCode,
  Row,
} from './TicketPreview.style';
import logo from '../../../images/cinema.png';
import logo2 from '../../../images/filmshows2.jpg';
import barCode from '../../../images/barCode2.png';

const TicketPreview = ({
  movie,
  filmshow: {
    playDate,
    room: { name },
  },
  seatCords,
}) => {
  const row = seatCords[0];
  const col = seatCords[1];
  return (
    <Content image={logo2}>
      <Logo src={logo} />
      <WiderColumn>
        <Info>
          <FilmshowDetails>
            <h4>{name}</h4>
            <h4>{playDate.split(' ')[0]}</h4>
            <h4>{playDate.split(' ')[1]}</h4>
          </FilmshowDetails>
          <SeatsContainer>
            <SeatCords>
              <SeatHeader>Rząd:</SeatHeader>
              <SeatNumber>{row}</SeatNumber>
            </SeatCords>
            <SeatCords>
              <SeatHeader>Miejsce:</SeatHeader>
              <SeatNumber>{col}</SeatNumber>
            </SeatCords>
          </SeatsContainer>
        </Info>
      </WiderColumn>
      <NarrowerColumn>
        <Row>
          <p>{playDate.split(' ')[0]}</p>
          <p>{playDate.split(' ')[1]}</p>
        </Row>
        <Row>
          <p>Miejsce: {col}</p>
          <p>Rząd: {row}</p>
        </Row>
        <BarCode src={barCode} />
      </NarrowerColumn>
    </Content>
  );
};

export default TicketPreview;
