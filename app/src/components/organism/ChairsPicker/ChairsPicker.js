import React from 'react';
import ChairPreview from '../../atoms/ChairPreview/ChairPreview';
import CinemaRoom from '../CinemaRoom/CinemaRoom';
import {
  Screen,
  Legend,
  LegendElement,
  LegendText,
  ScreenText,
} from './ChairsPicker.style';
const ChairsPicker = ({
  room: { rows, cols, unavailableSeats },
  filmshow: { occupiedSeats },
  reservedSeats,
  setReservedSeats,
}) => {
  return (
    <>
      <Screen>
        <ScreenText>EKRAN</ScreenText>
      </Screen>
      <CinemaRoom
        rows={rows}
        cols={cols}
        unavailableSeats={unavailableSeats}
        occupiedSeats={occupiedSeats}
        reservedSeats={reservedSeats}
        setReservedSeats={setReservedSeats}
      />
      <Legend>
        <LegendElement>
          <ChairPreview chairState='selected' cursorDisabled />
          <LegendText>Wybrane</LegendText>
        </LegendElement>
        <LegendElement>
          <ChairPreview chairState='available' cursorDisabled />
          <LegendText>Dostępne</LegendText>
        </LegendElement>
        <LegendElement>
          <ChairPreview chairState='reserved' cursorDisabled />
          <LegendText>Zarezerowane</LegendText>
        </LegendElement>
      </Legend>
    </>
  );
};

export default ChairsPicker;
